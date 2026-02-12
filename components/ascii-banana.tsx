"use client";

import { useEffect, useRef, useState } from "react";

export function AsciiBanana() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll indicator fade
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three.js scene + ASCII effect
  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;
    let animId = 0;
    let onResize: (() => void) | null = null;
    let cleanupDrag: (() => void) | null = null;
    let effectDom: HTMLElement | null = null;

    (async () => {
      const THREE = await import("three");
      const { AsciiEffect } = await import(
        "three/examples/jsm/effects/AsciiEffect.js"
      );
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );

      if (disposed || !containerRef.current) return;
      const container = containerRef.current;

      // ── Scene ──
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.set(0.1, -0.3, 5.5);

      // ── Renderer ──
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(1);

      // ── ASCII Effect ──
      const effect = new AsciiEffect(renderer, " .,:;~=+*#$@", {
        invert: true,
        color: false,
        resolution: 0.15,
      });
      effect.setSize(window.innerWidth, window.innerHeight);

      const dom = effect.domElement as HTMLElement;
      dom.style.color = "var(--foreground)";
      dom.style.backgroundColor = "transparent";
      dom.style.position = "absolute";
      dom.style.inset = "0";

      // Override the hardcoded Courier font → JetBrains Mono
      const overrideFont = () => {
        const table = dom.querySelector("table") as HTMLTableElement | null;
        if (table) {
          table.style.fontFamily =
            "'JetBrains Mono', ui-monospace, 'Courier New', monospace";
        }
      };
      overrideFont();

      container.appendChild(dom);
      effectDom = dom;

      // ── Lighting ──
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(3, 4, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
      fillLight.position.set(-3, -1, 3);
      scene.add(fillLight);

      scene.add(new THREE.AmbientLight(0x333333));

      // ── Load banana GLB model ──
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync("/banana.glb");
      if (disposed) return;

      const model = gltf.scene;

      // Override all materials to monochrome for ASCII effect
      const mat = new THREE.MeshStandardMaterial({
        color: 0xbbbbbb,
        roughness: 0.5,
      });
      model.traverse((child) => {
        if ("isMesh" in child && child.isMesh) {
          (child as InstanceType<typeof THREE.Mesh>).material = mat;
        }
      });

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3 / maxDim; // fit into ~3 units
      model.scale.setScalar(scale);
      // Re-center after scaling
      const scaledBox = new THREE.Box3().setFromObject(model);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      model.position.sub(scaledCenter);

      const group = new THREE.Group();
      group.add(model);
      scene.add(group);

      // ── Drag-to-rotate state ──
      let isDragging = false;
      let prevX = 0;
      let prevY = 0;
      let dragRotY = 0;
      let dragRotX = 0;
      let autoRotY = 0;
      let lastInteraction = 0;
      const RESUME_DELAY = 1000; // ms before auto-spin resumes
      const DRAG_SENSITIVITY = 0.005;

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        dom.style.cursor = "grabbing";
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        dragRotY += dx * DRAG_SENSITIVITY;
        dragRotX += dy * DRAG_SENSITIVITY;
        // Clamp vertical rotation
        dragRotX = Math.max(-1, Math.min(1, dragRotX));
        prevX = e.clientX;
        prevY = e.clientY;
        lastInteraction = performance.now();
      };
      const onPointerUp = () => {
        isDragging = false;
        dom.style.cursor = "grab";
        lastInteraction = performance.now();
      };

      // ── Zoom state ──
      const MIN_Z = 3;
      const MAX_Z = 10;
      const ZOOM_SENSITIVITY = 0.01;
      let pinchDist = 0;

      const onWheel = (e: WheelEvent) => {
        // Only zoom on pinch (ctrlKey is set by trackpad pinch gestures)
        if (!e.ctrlKey) return;
        e.preventDefault();
        camera.position.z = Math.min(
          MAX_Z,
          Math.max(MIN_Z, camera.position.z + e.deltaY * ZOOM_SENSITIVITY)
        );
        lastInteraction = performance.now();
      };

      const getTouchDist = (e: TouchEvent) => {
        const [a, b] = [e.touches[0], e.touches[1]];
        return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      };

      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          pinchDist = getTouchDist(e);
        }
      };
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          e.preventDefault();
          const newDist = getTouchDist(e);
          const delta = pinchDist - newDist;
          camera.position.z = Math.min(
            MAX_Z,
            Math.max(MIN_Z, camera.position.z + delta * 0.02)
          );
          pinchDist = newDist;
          lastInteraction = performance.now();
        }
      };

      dom.style.cursor = "grab";
      dom.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      dom.addEventListener("wheel", onWheel, { passive: false });
      dom.addEventListener("touchstart", onTouchStart, { passive: true });
      dom.addEventListener("touchmove", onTouchMove, { passive: false });

      // ── Animation ──
      const autoSpeed = 0.8;
      let lastTime = performance.now();
      const animate = () => {
        if (disposed) return;
        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        // Resume auto-rotation after idle
        if (!isDragging && now - lastInteraction > RESUME_DELAY) {
          autoRotY += dt * autoSpeed;
        }

        group.rotation.y = autoRotY + dragRotY;
        group.rotation.x = dragRotX;
        effect.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();

      // ── Resize ──
      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        effect.setSize(window.innerWidth, window.innerHeight);
        overrideFont();
      };
      window.addEventListener("resize", onResize);

      // Store cleanup refs
      cleanupDrag = () => {
        dom.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        dom.removeEventListener("wheel", onWheel);
        dom.removeEventListener("touchstart", onTouchStart);
        dom.removeEventListener("touchmove", onTouchMove);
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      if (onResize) window.removeEventListener("resize", onResize);
      if (cleanupDrag) cleanupDrag();
      if (effectDom && containerRef.current?.contains(effectDom)) {
        containerRef.current.removeChild(effectDom);
      }
    };
  }, []);

  return (
    <div className="h-[115vh] relative select-none overflow-hidden">
      {/* Container — text-shadow creates RGB chromatic aberration on the ASCII chars */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          textShadow:
            "-2px 0 rgba(255,0,0,0.25), 2px 0 rgba(0,220,255,0.25)",
        }}
      />
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted transition-opacity duration-700 z-10 ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}
