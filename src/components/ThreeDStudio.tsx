import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Procedural texture generators for guaranteed zero-latency, offline-safe photorealistic materials
function createMaterialTexture(type: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  switch (type) {
    case 'bwp-plywood': {
      // BWP Grade A - Deep Reddish-Brown Gurjan Timber Grain
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#7A3215');
      grad.addColorStop(0.25, '#9E441D');
      grad.addColorStop(0.55, '#873B18');
      grad.addColorStop(0.85, '#682910');
      grad.addColorStop(1, '#8C3D1A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Vertical hardwood pores and grain
      ctx.fillStyle = 'rgba(50, 18, 8, 0.35)';
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * 1024;
        const w = Math.random() * 5 + 1;
        ctx.fillRect(x, 0, w, 1024);
      }
      ctx.fillStyle = 'rgba(215, 110, 50, 0.12)';
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 1024;
        ctx.fillRect(x, 0, Math.random() * 3 + 1, 1024);
      }
      break;
    }
    case 'bwr-plywood': {
      // BWR Grade B - Light Blonde Birch / Pine Grain
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#E8C9A3');
      grad.addColorStop(0.3, '#F5DEB3');
      grad.addColorStop(0.65, '#E2C29B');
      grad.addColorStop(1, '#D9B489');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Delicate pine grain striations
      ctx.fillStyle = 'rgba(165, 115, 68, 0.2)';
      for (let i = 0; i < 70; i++) {
        const x = Math.random() * 1024;
        const w = Math.random() * 4 + 1;
        ctx.fillRect(x, 0, w, 1024);
      }
      break;
    }
    case 'mr-plywood': {
      // MR Grade C - Light Ash / Commercial Timber Grain
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#D8C3A5');
      grad.addColorStop(0.4, '#EAE0D5');
      grad.addColorStop(0.75, '#D5BDA6');
      grad.addColorStop(1, '#C9B198');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine speckled wood texture
      ctx.fillStyle = 'rgba(120, 95, 70, 0.18)';
      for (let i = 0; i < 110; i++) {
        const x = Math.random() * 1024;
        ctx.fillRect(x, 0, Math.random() * 3 + 1, 1024);
      }
      break;
    }
    case 'laminates': {
      // 1mm Decorative Surface - Pale Smooth Modern Warm Putty Laminate
      const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 600);
      grad.addColorStop(0, '#EDE6D6');
      grad.addColorStop(0.7, '#DED6C4');
      grad.addColorStop(1, '#CFC5B0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Micro-matte matte finish
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let y = 0; y < 1024; y += 16) {
        ctx.fillRect(0, y, 1024, 1);
      }
      break;
    }
    case 'natural-veneers': {
      // Natural Veneer - Rich Quarter-Cut Smoked Teak/Oak Grain
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#B3743B');
      grad.addColorStop(0.3, '#945524');
      grad.addColorStop(0.7, '#C88746');
      grad.addColorStop(1, '#7D4016');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Pronounced architectural cathedral wood figure
      ctx.strokeStyle = 'rgba(50, 20, 5, 0.28)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 30; i++) {
        const x = i * 36;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + 20, 300, x - 15, 700, x + 10, 1024);
        ctx.stroke();
      }
      break;
    }
    case 'flush-doors': {
      // Flush Door - Architectural Solid Core Door Surface with Perimeter Rail Lines
      ctx.fillStyle = '#A06B42';
      ctx.fillRect(0, 0, 1024, 1024);

      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#8E5A32');
      grad.addColorStop(0.5, '#AF784C');
      grad.addColorStop(1, '#85522C');
      ctx.fillStyle = grad;
      ctx.fillRect(60, 60, 904, 904);

      // Elegant vertical paneling
      ctx.fillStyle = 'rgba(40, 18, 5, 0.3)';
      ctx.fillRect(510, 60, 4, 904);
      break;
    }
    case 'block-boards': {
      // Block Board - Calibrated Core with Solid Batten Edge Structure
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#C29867');
      grad.addColorStop(0.35, '#DBB382');
      grad.addColorStop(0.7, '#BA8F5E');
      grad.addColorStop(1, '#AB804F');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Visible solid batten segmentation
      ctx.fillStyle = 'rgba(80, 50, 20, 0.25)';
      for (let x = 0; x < 1024; x += 128) {
        ctx.fillRect(x, 0, 3, 1024);
      }
      break;
    }
    case 'hardware-fittings': {
      // European Hardware - Brushed Luxury Brass & Chrome Metallic Sheen
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, '#E0BA62');
      grad.addColorStop(0.3, '#C89B3C');
      grad.addColorStop(0.5, '#F7E7B4');
      grad.addColorStop(0.7, '#A87D25');
      grad.addColorStop(1, '#D8AF4E');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Brushed metal hairline texture
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      for (let y = 0; y < 1024; y += 4) {
        ctx.fillRect(0, y, 1024, 1);
      }
      ctx.fillStyle = 'rgba(70, 50, 10, 0.15)';
      for (let y = 2; y < 1024; y += 6) {
        ctx.fillRect(0, y, 1024, 1);
      }
      break;
    }
    default: {
      // Kanha Signature Imperial Peacock Satin
      const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 600);
      grad.addColorStop(0, '#008A87');
      grad.addColorStop(0.6, '#006B8F');
      grad.addColorStop(1, '#073B5C');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Procedural multi-ply calibrated edge grain texture with glue lines
function createPlyEdgeTexture(grade: 'bwp' | 'bwr' | 'mr' | 'blockboard') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  if (grade === 'blockboard') {
    // Solid pine blocks with face veneers top and bottom
    ctx.fillStyle = '#6E4523';
    ctx.fillRect(0, 0, 512, 10); // top veneer
    ctx.fillRect(0, 118, 512, 10); // bottom veneer

    // Solid blocks
    const blockW = 64;
    for (let x = 0; x < 512; x += blockW) {
      ctx.fillStyle = (x / blockW) % 2 === 0 ? '#DBB382' : '#CFA26D';
      ctx.fillRect(x, 10, blockW - 2, 108);
      ctx.fillStyle = 'rgba(50, 25, 5, 0.7)';
      ctx.fillRect(x + blockW - 2, 10, 2, 108);
    }
  } else {
    // 7-Ply or 9-Ply calibrated staggered grain
    const layers = grade === 'bwp' ? 9 : 7;
    const layerHeight = 128 / layers;
    const isBwp = grade === 'bwp';

    for (let i = 0; i < layers; i++) {
      const isDark = i % 2 === 1;
      ctx.fillStyle = isDark
        ? (isBwp ? '#5C2D12' : '#8A5832')
        : (isBwp ? '#C28B54' : '#E8C9A3');
      ctx.fillRect(0, i * layerHeight, 512, layerHeight);

      // Phenolic or synthetic adhesive bond line
      ctx.fillStyle = isBwp ? 'rgba(30, 8, 2, 0.95)' : 'rgba(70, 30, 10, 0.65)';
      ctx.fillRect(0, (i + 1) * layerHeight - 1.5, 512, isBwp ? 2.5 : 1.5);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export interface MaterialSpec {
  id: string;
  name: string;
  icon: string;
  grade: string;
  category: 'plywood' | 'surfaces' | 'doors-hardware';
  thickness: string;
  core: string;
  finish: string;
  warranty: string;
  desc: string;
  color: string;
  metalness?: number;
  roughness?: number;
  layerLabels: string[];
}

export const CATALOG_MATERIALS: MaterialSpec[] = [
  {
    id: 'bwp-plywood',
    name: 'BWP Plywood',
    icon: '🪵',
    grade: 'Grade A · Boiling Waterproof (IS:710)',
    category: 'plywood',
    thickness: '16mm / 19mm Calibrated',
    core: '100% Gurjan Hardwood Marine Core',
    finish: 'Boiling Waterproof Phenolic Bonded · Smooth Face',
    warranty: '25 Years Structural',
    desc: 'Uncompromising waterproof durability. 72-hour boil-tested for wet kitchens, luxury vanity cabinets, and coastal environments.',
    color: '#8D4925',
    roughness: 0.45,
    metalness: 0.02,
    layerLabels: [
      'Face Gurjan Timber Veneer',
      'Boiling Waterproof Phenolic Resin Barrier',
      '7-Ply Cross-Laminated Calibrated Core',
      'Hydrophobic Phenol Formaldehyde Bond',
      'Balancing Under-Veneer',
    ],
  },
  {
    id: 'bwr-plywood',
    name: 'BWR Plywood',
    icon: '🔶',
    grade: 'Grade B · Boiling Water Resistant (IS:303)',
    category: 'plywood',
    thickness: '12mm / 16mm / 19mm',
    core: 'Selected Calibrated Hardwood',
    finish: 'MUF Resin Bonded · Blonde Pine Face',
    warranty: '15 Years Structural',
    desc: 'Versatile moisture-resistant structural grade engineered for bedroom wardrobes, living credenzas, and interior joinery.',
    color: '#D8B892',
    roughness: 0.48,
    metalness: 0.02,
    layerLabels: [
      'Blonde Hardwood Face Ply',
      'Melamine Urea Formaldehyde Bond',
      '5-Ply High-Density Cross Core',
      'Resin Adhesive Interlayer',
      'Calibrated Backing Veneer',
    ],
  },
  {
    id: 'mr-plywood',
    name: 'MR Plywood',
    icon: '🟫',
    grade: 'Grade C · Moisture Resistant (IS:303)',
    category: 'plywood',
    thickness: '6mm / 9mm / 12mm / 19mm',
    core: 'High-Density Plantation Timber',
    finish: 'Synthetic Resin Bonded · Light Ash Grain',
    warranty: '10 Years Structural',
    desc: 'Economical, dimensionally stable panel board ideal for dry room furnishings, partitions, wall paneling, and false ceiling ribs.',
    color: '#CDB596',
    roughness: 0.52,
    metalness: 0.02,
    layerLabels: [
      'Commercial Smooth Face Veneer',
      'Synthetic Resin Adhesive',
      'Calibrated Core Timber Plies',
      'Uniform Pressure Bonding Line',
      'Balancing Face Veneer',
    ],
  },
  {
    id: 'laminates',
    name: 'Decorative Laminates',
    icon: '🎨',
    grade: '1.0mm · High-Pressure Decorative Surface',
    category: 'surfaces',
    thickness: '0.8mm – 1.25mm Ultra-Slim',
    core: 'Multi-layer Kraft Paper + Phenolic Resin',
    finish: 'Anti-Fingerprint Scratch-Shield · Matte',
    warranty: '10 Years Surface Shield',
    desc: 'Superior surface protection with zero-glare matte texture, heat resistance up to 180°C, and antimicrobial easy-clean coating.',
    color: '#D6CEBE',
    roughness: 0.28,
    metalness: 0.04,
    layerLabels: [
      'Transparent Scratch-Shield Overlay',
      'Decorative Pigmented Design Sheet',
      'Phenolic Impregnated Kraft Core',
      'High-Pressure Bonded Matrix',
      'Textured Sanded Backing for Adhesion',
    ],
  },
  {
    id: 'natural-veneers',
    name: 'Natural Veneers',
    icon: '🌿',
    grade: '0.6mm · Authentic Wood Species',
    category: 'surfaces',
    thickness: '0.6mm Architectural Sliced',
    core: 'Fleece-Backed Natural Timber',
    finish: 'Natural Sliced Smoked Walnut / Teak · Satin PU',
    warranty: '12 Years Reserve',
    desc: 'Real organic timber grain with natural chatoyancy. Sourced from sustainable forestry for bespoke focal walls and heirloom cabinetry.',
    color: '#B3743B',
    roughness: 0.35,
    metalness: 0.05,
    layerLabels: [
      'Quarter-Cut Natural Wood Slicing (0.6mm)',
      'UV-Cured Protective Satin Acrylic Lacquer',
      'Reinforced Cellulose Fleece Backing',
      'Thermal Heat-Resistant Adhesive Bond',
      'Calibrated Substrate Underlayer',
    ],
  },
  {
    id: 'flush-doors',
    name: 'Flush Doors',
    icon: '🚪',
    grade: '35–45mm · Solid Core BWP (IS:2202)',
    category: 'doors-hardware',
    thickness: '35mm / 40mm / 45mm Heavy-Duty',
    core: 'Kiln-Seasoned Pine Battens + Hardwood Stiles',
    finish: 'Cross-Banded BWP Face with Hardwood Lippers',
    warranty: '15 Years Warp-Free',
    desc: 'Solid kiln-dried timber blocks eliminate warping. Sound-insulating acoustic core tested to 32dB for premium entrance and bedroom doors.',
    color: '#8E5A32',
    roughness: 0.32,
    metalness: 0.08,
    layerLabels: [
      'Decorative Surface Skin / Veneer',
      'Calibrated Cross-Banding Ply',
      'Kiln-Seasoned Solid Pine Batten Core',
      'Hardwood Perimeter Stiles & Rails',
      'Counter-Balancing Exterior Skin',
    ],
  },
  {
    id: 'block-boards',
    name: 'Block Boards',
    icon: '📦',
    grade: '19–25mm · Rigid Pine Core (IS:1659)',
    category: 'plywood',
    thickness: '19mm / 25mm Calibrated',
    core: 'Solid Seasoned Pine Block Battens',
    finish: 'Dual Cross-Banded Surface',
    warranty: '12 Years Structural',
    desc: 'Superior longitudinal rigidity. Prevents bending over extended spans, making it the premier choice for long wardrobe shutters and book shelving.',
    color: '#DBB382',
    roughness: 0.42,
    metalness: 0.03,
    layerLabels: [
      'Top Calibrated Face Veneer',
      'High-Density Cross-Band Ply',
      'Parallel Solid Pine Block Battens',
      'Under Cross-Band Stabilizer',
      'Bottom Tension-Balancing Ply',
    ],
  },
  {
    id: 'hardware-fittings',
    name: 'Hardware & Fittings',
    icon: '🔩',
    grade: 'European Standard (EN 15570 Grade 3)',
    category: 'doors-hardware',
    thickness: 'German Engineered Mechanisms',
    core: 'Cold-Rolled Hardened Steel & Brass',
    finish: 'Brushed Luxury Brass / Matte Anthracite',
    warranty: 'Lifetime Mechanism Warranty',
    desc: 'Precision soft-close hydraulic hinges, silent under-mount tandem runners, and architectural brass pulls by Hettich, Häfele & Ebco.',
    color: '#C89B3C',
    roughness: 0.18,
    metalness: 0.88,
    layerLabels: [
      'Architectural Brushed Gold Plating',
      'Hydraulic Integrated Soft-Close Damper',
      'Cold-Rolled Hardened Steel Articulated Arm',
      '3D Cam-Adjustable Mounting Baseplate',
      'High-Torque Stainless Fixing Screws',
    ],
  },
];

export default function ThreeDStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState<MaterialSpec>(CATALOG_MATERIALS[0]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'plywood' | 'surfaces' | 'doors-hardware'>('all');
  const [viewMode, setViewMode] = useState<'material' | 'cabinet'>('material');
  const [isExploded, setIsExploded] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingPreset, setLightingPreset] = useState<'warm' | 'daylight' | 'luxe'>('warm');

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupMaterialRef = useRef<THREE.Group | null>(null);
  const groupCabinetRef = useRef<THREE.Group | null>(null);
  const layerMeshesRef = useRef<THREE.Mesh[]>([]);
  const leftDoorRef = useRef<THREE.Group | null>(null);
  const rightDoorRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{ main: THREE.DirectionalLight; ambient: THREE.AmbientLight; rim: THREE.PointLight } | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationTargetRef = useRef({ x: 0.35, y: -0.6 });
  const zoomTargetRef = useRef(4.8);

  // Listen to external selection events (e.g. clicking "View Details →" from materials cards below)
  useEffect(() => {
    const handleSelectMaterial = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail && customEvent.detail.id) {
        const found = CATALOG_MATERIALS.find((m) => m.id === customEvent.detail.id);
        if (found) {
          setActiveMaterial(found);
          setViewMode('material');
          setIsExploded(false);
        }
      }
    };

    window.addEventListener('kanha-select-3d-material', handleSelectMaterial);
    return () => window.removeEventListener('kanha-select-3d-material', handleSelectMaterial);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const width = container.clientWidth;
    const height = container.clientHeight || 540;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff3db, 2.5);
    mainLight.position.set(5, 7, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xc89b3c, 1.8, 12);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x006b8f, 0.6);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    lightsRef.current = { main: mainLight, ambient: ambientLight, rim: rimLight };

    // Soft Shadow Contact Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(8, 8);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.25;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // ==========================================
    // 1. MATERIAL SLAB & EXPLODED CORE LAYERS
    // ==========================================
    const groupMaterial = new THREE.Group();
    groupMaterialRef.current = groupMaterial;
    scene.add(groupMaterial);

    const layerThickness = [0.035, 0.015, 0.12, 0.015, 0.035];
    const layerColors = [0x8d4925, 0x220c04, 0xd4a373, 0x220c04, 0x8d4925];
    const layerMeshes: THREE.Mesh[] = [];

    const edgeTexture = createPlyEdgeTexture('bwp');
    const woodTexture = createMaterialTexture('bwp-plywood');

    let currentY = -0.11;
    for (let i = 0; i < 5; i++) {
      const h = layerThickness[i];
      const geo = new THREE.BoxGeometry(2.4, h, 1.6);

      const isTop = i === 0;
      const isBottom = i === 4;
      const faceMat = new THREE.MeshStandardMaterial({
        map: isTop || isBottom ? woodTexture : undefined,
        color: isTop || isBottom ? 0xffffff : layerColors[i],
        roughness: isTop ? 0.35 : 0.8,
        metalness: 0.05,
      });

      const edgeMat = new THREE.MeshStandardMaterial({
        map: i === 2 ? edgeTexture : undefined,
        color: i === 2 ? 0xffffff : layerColors[i],
        roughness: 0.6,
      });

      const mats = [edgeMat, edgeMat, faceMat, faceMat, edgeMat, edgeMat];
      const mesh = new THREE.Mesh(geo, mats);
      mesh.position.y = currentY + h / 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { defaultY: mesh.position.y, layerIndex: i };

      groupMaterial.add(mesh);
      layerMeshes.push(mesh);

      currentY += h;
    }
    layerMeshesRef.current = layerMeshes;

    // Elegant gold bevel accent border for slab
    const borderGeo = new THREE.BoxGeometry(2.42, 0.01, 1.62);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0xc89b3c, metalness: 0.85, roughness: 0.2 });
    const borderMesh = new THREE.Mesh(borderGeo, borderMat);
    borderMesh.position.y = 0.115;
    groupMaterial.add(borderMesh);

    // ==========================================
    // 2. LUXURY MODULAR CABINET & CREDENZA MODULE
    // ==========================================
    const groupCabinet = new THREE.Group();
    groupCabinetRef.current = groupCabinet;
    groupCabinet.visible = false;
    scene.add(groupCabinet);

    // Carcass Main Body
    const cabinetWidth = 2.4;
    const cabinetHeight = 1.2;
    const cabinetDepth = 1.0;
    const carcassGeo = new THREE.BoxGeometry(cabinetWidth, cabinetHeight, cabinetDepth);
    const carcassMat = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.3,
      metalness: 0.08,
    });
    const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
    carcassMesh.castShadow = true;
    carcassMesh.receiveShadow = true;
    groupCabinet.add(carcassMesh);

    // Internal Shelf (visible when doors open)
    const shelfGeo = new THREE.BoxGeometry(cabinetWidth - 0.1, 0.04, cabinetDepth - 0.15);
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x222a33, roughness: 0.4 });
    const shelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    shelfMesh.position.y = 0;
    shelfMesh.position.z = 0.02;
    groupCabinet.add(shelfMesh);

    // Left Door Pivot Group
    const doorW = (cabinetWidth - 0.06) / 2;
    const doorH = cabinetHeight - 0.06;
    const doorD = 0.06;

    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-cabinetWidth / 2 + 0.02, 0, cabinetDepth / 2 + 0.01);
    groupCabinet.add(leftDoorPivot);
    leftDoorRef.current = leftDoorPivot;

    const leftDoorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(doorW, doorH, doorD),
      new THREE.MeshStandardMaterial({ color: 0x006b8f, roughness: 0.25, metalness: 0.15 })
    );
    leftDoorMesh.position.set(doorW / 2, 0, 0);
    leftDoorMesh.castShadow = true;
    leftDoorPivot.add(leftDoorMesh);

    // Left Handle (Brushed Gold)
    const handleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 16);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xc89b3c, metalness: 0.9, roughness: 0.18 });
    const leftHandle = new THREE.Mesh(handleGeo, handleMat);
    leftHandle.position.set(doorW - 0.08, 0, 0.05);
    leftDoorPivot.add(leftHandle);

    // Right Door Pivot Group
    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(cabinetWidth / 2 - 0.02, 0, cabinetDepth / 2 + 0.01);
    groupCabinet.add(rightDoorPivot);
    rightDoorRef.current = rightDoorPivot;

    const rightDoorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(doorW, doorH, doorD),
      new THREE.MeshStandardMaterial({ color: 0x006b8f, roughness: 0.25, metalness: 0.15 })
    );
    rightDoorMesh.position.set(-doorW / 2, 0, 0);
    rightDoorMesh.castShadow = true;
    rightDoorPivot.add(rightDoorMesh);

    // Right Handle
    const rightHandle = new THREE.Mesh(handleGeo, handleMat);
    rightHandle.position.set(-doorW + 0.08, 0, 0.05);
    rightDoorPivot.add(rightHandle);

    // Countertop Stone Slab
    const topGeo = new THREE.BoxGeometry(cabinetWidth + 0.08, 0.08, cabinetDepth + 0.08);
    const topMat = new THREE.MeshStandardMaterial({
      color: 0xf3f5f8,
      roughness: 0.18,
      metalness: 0.05,
    });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    topMesh.position.set(0, cabinetHeight / 2 + 0.04, 0);
    topMesh.castShadow = true;
    groupCabinet.add(topMesh);

    // Brushed Gold Base Plinth
    const plinthGeo = new THREE.BoxGeometry(cabinetWidth - 0.12, 0.14, cabinetDepth - 0.12);
    const plinthMesh = new THREE.Mesh(plinthGeo, handleMat);
    plinthMesh.position.set(0, -cabinetHeight / 2 - 0.07, 0);
    groupCabinet.add(plinthMesh);

    // Mouse & Touch Interaction for 3D Orbiting
    const dom = renderer.domElement;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousMousePositionRef.current.x;
      const deltaY = clientY - previousMousePositionRef.current.y;

      rotationTargetRef.current.y += deltaX * 0.008;
      rotationTargetRef.current.x = Math.max(-0.4, Math.min(0.9, rotationTargetRef.current.x + deltaY * 0.008));

      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTargetRef.current = Math.max(3.2, Math.min(6.5, zoomTargetRef.current + e.deltaY * 0.003));
    };

    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Render loop
    let reqId = 0;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Auto rotation
      if (autoRotate && !isDraggingRef.current) {
        rotationTargetRef.current.y += 0.0035;
      }

      // Smooth camera orbit
      camera.position.x = Math.sin(rotationTargetRef.current.y) * Math.cos(rotationTargetRef.current.x) * zoomTargetRef.current;
      camera.position.y = Math.sin(rotationTargetRef.current.x) * zoomTargetRef.current + 0.3;
      camera.position.z = Math.cos(rotationTargetRef.current.y) * Math.cos(rotationTargetRef.current.x) * zoomTargetRef.current;
      camera.lookAt(0, 0, 0);

      // Smooth door swinging animation
      if (leftDoorRef.current && rightDoorRef.current) {
        const targetAngle = doorsOpen ? -Math.PI / 2.3 : 0;
        leftDoorRef.current.rotation.y += (targetAngle - leftDoorRef.current.rotation.y) * 0.08;
        rightDoorRef.current.rotation.y += (-targetAngle - rightDoorRef.current.rotation.y) * 0.08;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, [autoRotate, doorsOpen]);

  // Effect: Switch View Mode (Material vs Cabinet)
  useEffect(() => {
    if (!groupMaterialRef.current || !groupCabinetRef.current) return;
    if (viewMode === 'material') {
      groupMaterialRef.current.visible = true;
      groupCabinetRef.current.visible = false;
    } else {
      groupMaterialRef.current.visible = false;
      groupCabinetRef.current.visible = true;
    }
  }, [viewMode]);

  // Effect: Explode / Collapse Layers Animation
  useEffect(() => {
    const meshes = layerMeshesRef.current;
    if (!meshes.length) return;

    const explodeGaps = [-0.68, -0.34, 0, 0.34, 0.68];

    let start: number | null = null;
    const duration = 650;
    const initialPositions = meshes.map((m) => m.position.y);
    const targetPositions = meshes.map((m, i) => {
      return isExploded ? m.userData.defaultY + explodeGaps[i] : m.userData.defaultY;
    });

    const stepAnim = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      meshes.forEach((mesh, idx) => {
        mesh.position.y = initialPositions[idx] + (targetPositions[idx] - initialPositions[idx]) * ease;
      });

      if (progress < 1) {
        requestAnimationFrame(stepAnim);
      }
    };
    requestAnimationFrame(stepAnim);
  }, [isExploded]);

  // Effect: Update Material Texture and Properties on activeMaterial change
  useEffect(() => {
    const meshes = layerMeshesRef.current;
    if (!meshes.length) return;

    const newTex = createMaterialTexture(activeMaterial.id);
    const edgeType =
      activeMaterial.id === 'block-boards'
        ? 'blockboard'
        : activeMaterial.id === 'bwp-plywood'
        ? 'bwp'
        : activeMaterial.id === 'bwr-plywood'
        ? 'bwr'
        : 'mr';
    const newEdgeTex = createPlyEdgeTexture(edgeType);

    // Update material faces & edge grain
    meshes.forEach((mesh, idx) => {
      const matArray = mesh.material as THREE.Material[];
      if (Array.isArray(matArray)) {
        const isTop = idx === 0;
        const isBottom = idx === 4;

        if (isTop || isBottom) {
          const faceMat = matArray[2] as THREE.MeshStandardMaterial;
          faceMat.map = newTex;
          faceMat.color.setHex(0xffffff);
          faceMat.roughness = activeMaterial.roughness ?? 0.35;
          faceMat.metalness = activeMaterial.metalness ?? 0.05;
          faceMat.needsUpdate = true;
        }

        // Core ply edge textures
        if (idx === 2) {
          const coreEdgeMat = matArray[0] as THREE.MeshStandardMaterial;
          coreEdgeMat.map = newEdgeTex;
          coreEdgeMat.needsUpdate = true;
        }
      }
    });

    // Update cabinet doors and carcass if in cabinet mode
    if (leftDoorRef.current && rightDoorRef.current) {
      const leftMesh = leftDoorRef.current.children[0] as THREE.Mesh;
      const rightMesh = rightDoorRef.current.children[0] as THREE.Mesh;
      const doorMat = leftMesh.material as THREE.MeshStandardMaterial;
      doorMat.color.set(activeMaterial.color);
      (rightMesh.material as THREE.MeshStandardMaterial).color.set(activeMaterial.color);
    }
  }, [activeMaterial]);

  // Effect: Lighting presets
  useEffect(() => {
    if (!lightsRef.current) return;
    const { main, ambient, rim } = lightsRef.current;

    if (lightingPreset === 'warm') {
      main.color.setHex(0xfff3db);
      main.intensity = 2.4;
      ambient.color.setHex(0xfff8ee);
      ambient.intensity = 1.2;
      rim.color.setHex(0xc89b3c);
      rim.intensity = 1.8;
    } else if (lightingPreset === 'daylight') {
      main.color.setHex(0xf4f9ff);
      main.intensity = 2.8;
      ambient.color.setHex(0xe8f0f8);
      ambient.intensity = 1.4;
      rim.color.setHex(0x8bc0d6);
      rim.intensity = 1.2;
    } else {
      // Luxe Midnight
      main.color.setHex(0x008a87);
      main.intensity = 1.8;
      ambient.color.setHex(0x073b5c);
      ambient.intensity = 0.8;
      rim.color.setHex(0xc89b3c);
      rim.intensity = 3.2;
    }
  }, [lightingPreset]);

  const resetCamera = () => {
    rotationTargetRef.current = { x: 0.35, y: -0.6 };
    zoomTargetRef.current = 4.8;
  };

  const filteredMaterials =
    filterCategory === 'all'
      ? CATALOG_MATERIALS
      : CATALOG_MATERIALS.filter((m) => m.category === filterCategory);

  return (
    <section
      id="3d-studio"
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, #0d171e 0%, #073B5C 50%, #0a1b24 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 400,
          background: 'radial-gradient(ellipse at center, rgba(0,107,143,0.3) 0%, rgba(7,59,92,0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(200,155,60,0.15)',
              border: '1px solid rgba(200,155,60,0.35)',
              padding: '6px 16px',
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: 13 }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
              }}
            >
              Interactive 3D Virtual Studio
            </span>
          </div>

          <h2
            className="three-studio-title"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(24px, 4vw, 46px)',
              fontWeight: 800,
              color: 'white',
              margin: '0 auto 16px',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              maxWidth: 840,
            }}
          >
            Touch, Rotate & Inspect <br className="hide-mobile" />
            <span
              className="three-studio-accent"
              style={{
                background: 'linear-gradient(135deg, #FFF0B8 0%, #F5CE76 40%, #E5A823 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#F5CE76',
                display: 'inline-block',
                fontWeight: 800,
              }}
            >
              Every Single Calibrated Material.
            </span>
          </h2>

          <p
            className="three-studio-desc"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.65,
              textAlign: 'center',
            }}
          >
            Select any material from our catalogue below to load it into the 3D studio. Drag to orbit in 360°,
            explode the calibrated core plies, or switch to the bespoke modular cabinet.
          </p>
        </div>

        {/* 3D Main Workbench Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 410px',
            gap: 28,
            alignItems: 'stretch',
            background: 'rgba(10, 24, 34, 0.8)',
            border: '1px solid rgba(200,155,60,0.22)',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(16px)',
          }}
          className="three-studio-grid"
        >
          {/* Left: 3D WebGL Canvas & On-Canvas Floating Toolbars */}
          <div className="three-canvas-col" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {/* Top Toolbar: Mode Switcher & Lighting Selector */}
            <div className="three-top-bar">
              {/* Mode Switcher */}
              <div className="three-mode-switcher">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('material');
                    setIsExploded(false);
                  }}
                  className={`three-mode-btn ${viewMode === 'material' ? 'active' : ''}`}
                >
                  <span>{activeMaterial.icon}</span> {activeMaterial.name.replace(' Plywood', '').replace('Decorative ', '')} 3D
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('cabinet');
                    setIsExploded(false);
                  }}
                  className={`three-mode-btn ${viewMode === 'cabinet' ? 'active' : ''}`}
                >
                  <span>🗄️</span> Modular Cabinet
                </button>
              </div>

              {/* Top Right: Lighting Preset Selector */}
              <div className="three-light-switcher">
                <span className="three-light-label">Light:</span>
                {[
                  { id: 'warm', label: '☀️ Warm' },
                  { id: 'daylight', label: '🌤️ Day' },
                  { id: 'luxe', label: '🌙 Luxe' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLightingPreset(l.id as any)}
                    className={`three-light-btn ${lightingPreset === l.id ? 'active' : ''}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Canvas Mounting Target */}
            <div
              ref={containerRef}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                cursor: 'grab',
              }}
              onMouseDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
              onMouseUp={(e) => (e.currentTarget.style.cursor = 'grab')}
            />

            {/* Exploded Layer Labels Overlay (Visible when exploded) */}
            {isExploded && viewMode === 'material' && (
              <div
                style={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                {activeMaterial.layerLabels.map((lbl, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(7, 30, 44, 0.88)',
                      border: '1px solid var(--gold)',
                      borderRadius: 4,
                      padding: '5px 12px',
                      fontSize: 11,
                      fontFamily: 'var(--font-sans)',
                      color: 'white',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--gold)', color: '#073B5C', fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {idx + 1}
                    </span>
                    <span>{lbl}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Floating Interaction HUD */}
            {/* Bottom Floating Interaction HUD */}
            <div className="three-bottom-hud">
              {/* Primary Action Button (Explode or Open Doors) */}
              <div style={{ pointerEvents: 'auto' }}>
                {viewMode === 'material' ? (
                  <button
                    type="button"
                    onClick={() => setIsExploded(!isExploded)}
                    className="three-action-btn"
                  >
                    <span>{isExploded ? '▼ Collapse' : '▲ Explode Layers'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDoorsOpen(!doorsOpen)}
                    className="three-action-btn"
                  >
                    <span>{doorsOpen ? '🚪 Close Doors' : '🚪 Open Doors'}</span>
                  </button>
                )}
              </div>

              {/* View Utilities */}
              <div className="three-util-wrap">
                <button
                  type="button"
                  onClick={() => setAutoRotate(!autoRotate)}
                  title={autoRotate ? 'Pause 360° Rotation' : 'Start 360° Rotation'}
                  className={`three-util-btn ${autoRotate ? 'active' : ''}`}
                >
                  <span>{autoRotate ? '⏸ 360°' : '▶ 360°'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetCamera}
                  title="Reset Camera View"
                  className="three-util-btn"
                >
                  ↺ Reset
                </button>
              </div>
            </div>

            {/* Subtle mobile drag cue */}
            <div className="three-drag-cue">
              <span>✦ Drag 3D model with 1 finger · Scroll page along sides</span>
            </div>
          </div>

          {/* Right: 8-Material Swatch Browser & Technical Specifier */}
          <div className="three-specs-col">
            <div>
              {/* Category Filter Pills in scroll track */}
              <div className="horizontal-scroll-track no-scrollbar" style={{ gap: 6, marginBottom: 14 }}>
                {[
                  { id: 'all', label: 'All 8' },
                  { id: 'plywood', label: 'Plywood & Core' },
                  { id: 'surfaces', label: 'Surfaces' },
                  { id: 'doors-hardware', label: 'Doors & Fittings' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFilterCategory(c.id as any)}
                    style={{
                      background: filterCategory === c.id ? 'var(--peacock)' : 'rgba(255,255,255,0.06)',
                      color: filterCategory === c.id ? 'white' : 'rgba(255,255,255,0.65)',
                      border: 'none',
                      borderRadius: 4,
                      padding: '5px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all 0.15s',
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* 8-Material Visual Thumbnail Grid */}
              <div className="three-swatch-grid">
                {filteredMaterials.map((mat) => {
                  const isSelected = activeMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => {
                        setActiveMaterial(mat);
                        setViewMode('material');
                        setIsExploded(false);
                      }}
                      title={`${mat.name} (${mat.grade})`}
                      style={{
                        padding: '6px 4px 6px',
                        borderRadius: 6,
                        background: isSelected ? 'rgba(0,107,143,0.35)' : 'rgba(255,255,255,0.04)',
                        border: isSelected ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        transition: 'transform 0.15s, border 0.15s',
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                        boxShadow: isSelected ? '0 4px 12px rgba(200,155,60,0.3)' : 'none',
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: mat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.4)',
                        }}
                      >
                        {mat.icon}
                      </div>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: isSelected ? 'white' : 'rgba(255,255,255,0.75)',
                          textAlign: 'center',
                          lineHeight: 1.15,
                          maxWidth: 72,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%',
                        }}
                      >
                        {mat.name.replace(' Plywood', '').replace('Decorative ', '')}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Material Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {activeMaterial.grade}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--teal)',
                    border: '1px solid var(--teal)',
                    borderRadius: 3,
                    padding: '2px 6px',
                    fontWeight: 600,
                  }}
                >
                  {activeMaterial.thickness}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'white',
                  margin: '0 0 6px',
                }}
              >
                {activeMaterial.icon} {activeMaterial.name}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.5,
                  margin: '0 0 14px',
                }}
              >
                {activeMaterial.desc}
              </p>

              {/* Technical Specifications Grid */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 6,
                  padding: '12px 14px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Substrate Core</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 2 }}>{activeMaterial.core}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Surface Spec</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 2 }}>{activeMaterial.finish}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Calibration Standard</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--teal)', marginTop: 2 }}>±0.2mm Zero-Gap</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Warranty</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', marginTop: 2 }}>{activeMaterial.warranty}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <a
                href="#contact"
                className="btn-gold btn-mobile-full"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px 14px',
                  fontSize: 13,
                  fontWeight: 700,
                  boxSizing: 'border-box',
                  display: 'block',
                  whiteSpace: 'normal',
                }}
              >
                Request {activeMaterial.name} Sample Box →
              </a>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.4)',
                  textAlign: 'center',
                  marginTop: 6,
                }}
              >
                Free delivery of physical swatches to your home or site.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .three-canvas-col {
          min-height: 560px;
        }
        .three-specs-col {
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(5, 20, 30, 0.75);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }
        .three-top-bar {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          z-index: 10;
          pointer-events: none;
        }
        .three-mode-switcher {
          pointer-events: auto;
          display: flex;
          gap: 6px;
          background: rgba(7, 30, 44, 0.9);
          padding: 3px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
        }
        .three-mode-btn {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }
        .three-mode-btn.active {
          background: var(--peacock);
          color: white;
        }
        .three-light-switcher {
          pointer-events: auto;
          display: flex;
          gap: 4px;
          background: rgba(7, 30, 44, 0.9);
          padding: 3px 6px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          align-items: center;
        }
        .three-light-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-right: 2px;
        }
        .three-light-btn {
          background: transparent;
          border: 1px solid transparent;
          color: rgba(255,255,255,0.7);
          font-size: 10px;
          padding: 3px 6px;
          border-radius: 3px;
          cursor: pointer;
          white-space: nowrap;
        }
        .three-light-btn.active {
          background: rgba(200,155,60,0.3);
          border-color: var(--gold);
          color: white;
        }
        .three-bottom-hud {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
          z-index: 10;
          gap: 8px;
        }
        .three-action-btn {
          background: rgba(200,155,60,0.25);
          color: var(--gold);
          border: 1.5px solid var(--gold);
          border-radius: 4px;
          padding: 8px 14px;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          backdrop-filter: blur(6px);
          transition: all 0.2s;
        }
        .three-action-btn:hover {
          background: var(--gold);
          color: #073B5C;
        }
        .three-util-wrap {
          pointer-events: auto;
          display: flex;
          gap: 6px;
          background: rgba(7, 30, 44, 0.9);
          padding: 3px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
        }
        .three-util-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          padding: 5px 9px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }
        .three-util-btn.active {
          background: rgba(0,138,135,0.25);
          color: var(--teal);
        }
        .three-drag-cue {
          position: absolute;
          top: 54px;
          left: 14px;
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          font-family: var(--font-sans);
          pointer-events: none;
        }
        .three-swatch-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        @media (max-width: 960px) {
          .three-studio-grid {
            grid-template-columns: 1fr !important;
          }
          .three-canvas-col {
            min-height: 380px !important;
            height: 380px !important;
          }
          .three-specs-col {
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 600px) {
          .three-studio-title {
            font-size: 21px !important;
            line-height: 1.3 !important;
            letter-spacing: -0.01em !important;
            padding: 0 4px !important;
            text-align: center !important;
          }
          .three-studio-accent {
            display: inline !important;
            font-weight: 800 !important;
          }
          .three-studio-desc {
            font-size: 13px !important;
            line-height: 1.55 !important;
            padding: 0 6px !important;
          }
        }
        @media (max-width: 540px) {
          .three-top-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 6px;
            top: 10px;
            left: 10px;
            right: 10px;
          }
          .three-mode-switcher {
            width: 100%;
            justify-content: space-between;
          }
          .three-mode-btn {
            flex: 1;
            justify-content: center;
            font-size: 10px;
            padding: 5px 8px;
          }
          .three-light-switcher {
            justify-content: space-between;
            width: 100%;
          }
          .three-drag-cue {
            display: none;
          }
          .three-bottom-hud {
            bottom: 10px;
            left: 10px;
            right: 10px;
          }
          .three-action-btn {
            padding: 6px 10px;
            font-size: 11px;
          }
          .three-util-btn {
            padding: 4px 7px;
            font-size: 10px;
          }
          .three-swatch-grid {
            gap: 6px;
          }
        }
      `}</style>
    </section>
  );
}
