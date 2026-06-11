"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();

    // Camera — perspective looking down at the mesh from slight above
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2.5, 7);
    camera.lookAt(0, 2.5, 0); // Looking straight ahead puts the horizon exactly in the middle of the screen

    // Geometry — large plane, many segments for smooth waves
    const SEGS = 140;
    const SIZE = 60;
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEGS, SEGS);
    geometry.rotateX(-Math.PI / 2); // lay flat

    // Store original positions for wave calculation
    const posAttr = geometry.attributes.position;
    const count = posAttr.count;
    const origY = new Float32Array(count);
    for (let i = 0; i < count; i++) origY[i] = posAttr.getY(i);

    // Wireframe material — thin white lines, slightly dimmed
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      opacity: 0.7,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -2.5;  // push mesh down so it rises from bottom of screen
    scene.add(mesh);

    // Fog to fade mesh into black at edges / depth
    scene.fog = new THREE.FogExp2(0x000000, 0.055);

    // Animation state
    let startTime = performance.now();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      // Wave deformation
      for (let i = 0; i < count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);

        // Multiple overlapping sine waves for organic look
        const wave1 = Math.sin(x * 0.5 + t * 0.9) * 0.7;
        const wave2 = Math.sin(z * 0.4 + t * 0.7) * 0.5;
        const wave3 = Math.sin((x + z) * 0.3 + t * 0.5) * 0.3;
        const wave4 = Math.cos(x * 0.25 - z * 0.3 + t * 0.6) * 0.4;

        posAttr.setY(i, origY[i] + wave1 + wave2 + wave3 + wave4);
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Subtle mouse parallax on camera
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      camera.position.x += (nx * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-ny * 0.3 + 2.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 2.5, 0);
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(0,0,0,0.72)_100%)]"></div>
      <div className="absolute top-0 left-0 right-0 h-[18vh] z-0 pointer-events-none bg-gradient-to-b from-[rgba(0,0,0,0.55)] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[38vh] z-0 pointer-events-none bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
