import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene({ height = 500 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth, H = height;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const redLight = new THREE.PointLight(0xe41e26, 2, 20);
    redLight.position.set(-4, 3, 4);
    scene.add(redLight);
    const whiteLight = new THREE.DirectionalLight(0xffffff, 0.8);
    whiteLight.position.set(4, 4, 4);
    scene.add(whiteLight);

    // Camera body
    const camBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.4, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3, metalness: 0.7 })
    );
    scene.add(camBody);

    // Camera lens
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.8, 32),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.9 })
    );
    lens.rotation.z = Math.PI / 2;
    lens.position.set(1.4, 0, 0);
    scene.add(lens);

    // Lens glass
    const lensGlass = new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 32),
      new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0, metalness: 1, transparent: true, opacity: 0.8 })
    );
    lensGlass.rotation.y = Math.PI / 2;
    lensGlass.position.set(1.81, 0, 0);
    scene.add(lensGlass);

    // Red record button
    const recBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.08, 32),
      new THREE.MeshStandardMaterial({ color: 0xe41e26, emissive: 0xe41e26, emissiveIntensity: 0.5 })
    );
    recBtn.position.set(0.6, 0.78, 0);
    scene.add(recBtn);

    // Timeline bar
    const timeline = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.08, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    timeline.position.set(0, -1.5, 0);
    scene.add(timeline);

    // Timeline clips
    const clipColors = [0xe41e26, 0xe41e26, 0x333333, 0xe41e26, 0x222222, 0xe41e26];
    const clipWidths = [0.5, 0.8, 0.3, 0.6, 0.4, 0.7];
    let xPos = -1.8;
    clipColors.forEach((color, i) => {
      const clip = new THREE.Mesh(
        new THREE.BoxGeometry(clipWidths[i], 0.3, 0.28),
        new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.9 })
      );
      clip.position.set(xPos + clipWidths[i] / 2, -1.5, 0);
      xPos += clipWidths[i] + 0.06;
      scene.add(clip);
    });

    // Floating particles
    const particleGeo = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 14;
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xe41e26, size: 0.04, transparent: true, opacity: 0.6 })
    );
    scene.add(particles);

    // Animation
    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      camBody.rotation.y = Math.sin(t * 0.4) * 0.15;
      camBody.rotation.x = Math.sin(t * 0.3) * 0.08;
      lens.rotation.y = camBody.rotation.y;
      lens.rotation.x = camBody.rotation.x;
      lensGlass.rotation.y = Math.PI / 2 + camBody.rotation.y;
      recBtn.rotation.y = camBody.rotation.y;
      particles.rotation.y = t * 0.05;
      redLight.position.x = Math.sin(t * 0.5) * 5;
      redLight.position.y = Math.cos(t * 0.5) * 3;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const W2 = mount.clientWidth;
      camera.aspect = W2 / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [height]);

  return <div ref={mountRef} style={{ width: '100%', height }} />;
}
