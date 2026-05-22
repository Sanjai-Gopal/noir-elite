import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeBackdrop({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glslSupported, setGlslSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Check width and height of container
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const fogColor = theme === "light" ? 0xf4f4ef : 0x050505;
    scene.fog = new THREE.FogExp2(fogColor, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
    } catch {
      setGlslSupported(false);
      return;
    }

    // LUXURY 3D MONOLITH (PERFUME BOTTLE SIMULATION)
    const monolithicGroup = new THREE.Group();
    scene.add(monolithicGroup);

    // 1. Basalt/matte stone inner core
    const coreGeo = new THREE.CylinderGeometry(0.6, 0.6, 2.6, 4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: theme === "light" ? 0x242424 : 0x070707,
      roughness: 0.9,
      metalness: 0.2,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    monolithicGroup.add(coreMesh);

    // 2. Translucent outer glass encasement (Physically-based material)
    const glassGeo = new THREE.CylinderGeometry(0.8, 0.8, 3.0, 4, 1);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: theme === "light" ? 0xdddddf : 0x121212,
      transparent: true,
      opacity: theme === "light" ? 0.70 : 0.85,
      roughness: 0.20,
      metalness: 0.1,
      transmission: 0.9, // High transmission for high-end glass physics
      thickness: 0.7,
      ior: 1.55,
      flatShading: true,
      side: THREE.DoubleSide
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    monolithicGroup.add(glassMesh);

    // 3. Polished chrome neck ring
    const neckGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: theme === "light" ? 0xd1d1d6 : 0xd1d1d6,
      metalness: 1.0,
      roughness: 0.05,
      flatShading: false
    });
    const neckMesh = new THREE.Mesh(neckGeo, chromeMat);
    neckMesh.position.y = 1.65;
    monolithicGroup.add(neckMesh);

    // 4. Matte black cylinder cap
    const capGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.6, 4, 1);
    const capMat = new THREE.MeshStandardMaterial({
      color: theme === "light" ? 0x1a1a1a : 0x0c0c0c,
      roughness: 0.85,
      metalness: 0.3,
      flatShading: true
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 2.1;
    monolithicGroup.add(capMesh);

    // Slightly adjust group centering
    monolithicGroup.position.set(0, -0.3, 0);

    // STARS / COSMIC COSMOPOLIS DUST (PARTICLES)
    const particleCount = 1200;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a cylindrical or spherical spread around the product
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 12;

      positions[i] = radius * Math.cos(theta);
      positions[i + 1] = y;
      positions[i + 2] = radius * Math.sin(theta);

      scales[i / 3] = Math.random() * 1.5;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Canvas shader or smooth soft physical points
    const particlesMaterial = new THREE.PointsMaterial({
      color: theme === "light" ? 0x444444 : 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: theme === "light" ? 0.2 : 0.3,
      blending: theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false
    });

    const starParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(starParticles);

    // LIGHTING SETUP (STUDIO CHAIR OBSIDIAN THEMED)
    const ambientLight = new THREE.AmbientLight(theme === "light" ? 0x666666 : 0x050505);
    scene.add(ambientLight);

    // Dynamic key light (pure white spotlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, theme === "light" ? 5.0 : 4.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Back ambient rim light (soft silver)
    const rimLight = new THREE.DirectionalLight(0xa5a5b5, theme === "light" ? 4.0 : 3.5);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Glowing moving point lights (simulating camera flash / streetlamps)
    const magentaLight = new THREE.PointLight(0xffffff, theme === "light" ? 3.0 : 2.5, 12);
    magentaLight.position.set(0, 3, 2);
    scene.add(magentaLight);

    const blueLight = new THREE.PointLight(theme === "light" ? 0xdddddd : 0x7f7f7f, theme === "light" ? 2.0 : 1.5, 15);
    blueLight.position.set(-3, -2, 1);
    scene.add(blueLight);

    // INTERACTIVE PARALLAX AND ROTATION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // RESPONSIVE RESIZE
    const handleResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // SMOOTH SCROLL PARALLAX EFFECT
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ROTATION LOOP & ANIMATION
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Soft continuous product rotation
      monolithicGroup.rotation.y = elapsedTime * 0.12;
      monolithicGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08;

      // Slowly wave the dust
      starParticles.rotation.y = elapsedTime * 0.02;

      // Orbit glowing point lights
      magentaLight.position.x = Math.sin(elapsedTime * 0.8) * 3;
      magentaLight.position.z = Math.cos(elapsedTime * 0.8) * 3 + 2;

      blueLight.position.x = Math.cos(elapsedTime * 0.5) * 4;
      blueLight.position.z = Math.sin(elapsedTime * 0.5) * 4;

      // Mouse Parallax target smoothing
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      // Influence Camera positioning
      camera.position.x = targetX * 1.5;
      camera.position.y = -targetY * 1.5 + (scrollY * -0.001); // scroll triggers slight drop
      camera.lookAt(0, -0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP ON UNMOUNT (MANDATORY TO AVOID CRASHES)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);

      // Recursive disposal
      scene.clear();
      glassGeo.dispose();
      glassMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      neckGeo.dispose();
      chromeMat.dispose();
      capGeo.dispose();
      capMat.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  if (!glslSupported) {
    return (
      <div className={`absolute inset-0 ${theme === "light" ? "bg-[#f4f4ef]" : "bg-[#050505]"} flex items-center justify-center opacity-40`}>
        <div className="text-center">
          <p className="font-mono text-xs text-silver-400">[3D PIPELINE ENCRYPTED / FALLBACK INJECTED]</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="3d-canvas-container"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
