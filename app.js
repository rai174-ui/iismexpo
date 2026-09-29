/**
 * ═══════════════════════════════════════════════════════════════
 *  IISMEXPO — Organised by AMIGOCONNECT | app.js
 *  Complete interactive JavaScript for the IISMEXPO 2027 website
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────────
   1. UTILITY HELPERS
───────────────────────────────────────────────── */

/**
 * Format a number as Indian Rupee currency string
 * e.g. 80000 → "₹ 80,000"
 */
function formatINR(amount) {
  if (amount === 0) return '₹ 0';
  return '₹ ' + amount.toLocaleString('en-IN');
}

/**
 * Generate a random IISMEXPO booking reference ID
 * e.g. IISM-2027-AB4X7K
 */
function generateRefId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `IISM-2027-${id}`;
}

/* ─────────────────────────────────────────────────
   2. THREE.JS CRYSTAL CANVAS
───────────────────────────────────────────────── */

(function initCrystalCanvas() {
  const canvas = document.getElementById('crystalCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 1.5);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00F5D4, 3, 25);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x9B5DE5, 2, 25);
  pointLight2.position.set(-5, -3, 3);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xE0A96D, 1.5, 20);
  pointLight3.position.set(3, -5, -2);
  scene.add(pointLight3);

  // Red accent point light for CONNECT red theme
  const pointLightRed = new THREE.PointLight(0xFF3142, 2.5, 20);
  pointLightRed.position.set(0, 2, 4);
  scene.add(pointLightRed);

  // Crystal Group to align sphere encapsulating central text block
  const crystalGroup = new THREE.Group();
  scene.add(crystalGroup);

  // Main crystal — sized to fit title text block neatly without going into navbar
  const crystalGeo = new THREE.IcosahedronGeometry(1.55, 1);
  const crystalMat = new THREE.MeshPhongMaterial({
    color:      0x0a2e3a,
    emissive:   0x001a22,
    specular:   0x00F5D4,
    shininess:  180,
    wireframe:  false,
    transparent: true,
    opacity:    0.55,
  });
  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  crystalGroup.add(crystalMesh);

  // Wireframe overlay
  const wireGeo = new THREE.IcosahedronGeometry(1.58, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color:      0x00F5D4,
    wireframe:  true,
    opacity:    0.20,
    transparent: true,
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  crystalGroup.add(wireMesh);

  // Inner dodecahedron
  const innerGeo = new THREE.DodecahedronGeometry(0.85, 0);
  const innerMat = new THREE.MeshPhongMaterial({
    color:      0x1a0a30,
    emissive:   0x0d0020,
    specular:   0x9B5DE5,
    shininess:  220,
    transparent: true,
    opacity:    0.80,
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  crystalGroup.add(innerMesh);

  // Align sphere 3D center directly behind main title text block
  crystalGroup.position.set(0, 0.42, 0);

  // ── Floating 3D Metal & Mineral Ore System — 15 Lanthanide Elements (La to Lu) ──
  const floatingMetalsGroup = new THREE.Group();
  scene.add(floatingMetalsGroup);

  // 15 Lanthanide Rare Earth Elements
  const LANTHANIDE_ELEMENTS = [
    { num: 57, symbol: 'La', name: 'Lanthanum',   mineral: 'Bastnäsite / Monazite', color: 0xE0A96D, specular: 0xFFF0AA, glow: '#E0A96D' },
    { num: 58, symbol: 'Ce', name: 'Cerium',      mineral: 'Cerite / Monazite',     color: 0xD97736, specular: 0xFFD8CC, glow: '#D97736' },
    { num: 59, symbol: 'Pr', name: 'Praseodymium', mineral: 'Bastnäsite Ore',       color: 0x2A9D8F, specular: 0x80FFE8, glow: '#2A9D8F' },
    { num: 60, symbol: 'Nd', name: 'Neodymium',   mineral: 'NdFeB Magnet Ore',      color: 0x9B5DE5, specular: 0xE0AAFF, glow: '#9B5DE5' },
    { num: 61, symbol: 'Pm', name: 'Promethium',  mineral: 'Nuclear REE Isotope',   color: 0x00F5D4, specular: 0xA6FFF2, glow: '#00F5D4' },
    { num: 62, symbol: 'Sm', name: 'Samarium',    mineral: 'Samarskite Ore',        color: 0xF4A261, specular: 0xFFE5D9, glow: '#F4A261' },
    { num: 63, symbol: 'Eu', name: 'Europium',    mineral: 'Europium Phosphor',     color: 0xFF3142, specular: 0xFFB3BA, glow: '#FF3142' },
    { num: 64, symbol: 'Gd', name: 'Gadolinium',  mineral: 'Gadolinite Specimen',   color: 0xE2E8F0, specular: 0xFFFFFF, glow: '#E2E8F0' },
    { num: 65, symbol: 'Tb', name: 'Terbium',     mineral: 'Terfenol-D Ore',        color: 0x00BB77, specular: 0x88FFCC, glow: '#00BB77' },
    { num: 66, symbol: 'Dy', name: 'Dysprosium',  mineral: 'Xenotime REE Ore',      color: 0x7209B7, specular: 0xD8B4FE, glow: '#7209B7' },
    { num: 67, symbol: 'Ho', name: 'Holmium',     mineral: 'Holmite Crystal',       color: 0xE63946, specular: 0xFFC2C7, glow: '#E63946' },
    { num: 68, symbol: 'Er', name: 'Erbium',      mineral: 'Erbium Erbita Ore',     color: 0xFF69B4, specular: 0xFFC0CB, glow: '#FF69B4' },
    { num: 69, symbol: 'Tm', name: 'Thulium',     mineral: 'Thulite Specimen',      color: 0x4895EF, specular: 0xBEE9E8, glow: '#4895EF' },
    { num: 70, symbol: 'Yb', name: 'Ytterbium',   mineral: 'Ytterbite Specimen',    color: 0x4CC9F0, specular: 0xE0F7FA, glow: '#4CC9F0' },
    { num: 71, symbol: 'Lu', name: 'Lutetium',    mineral: 'Heavy REE Lutetium',    color: 0xFFD700, specular: 0xFFFAEB, glow: '#FFD700' },
  ];

  // Helper to generate realistic, organic deformed mineral ore geometries
  function createDeformedOreGeometry(type, radius, distortion) {
    let geo;
    if (type === 'nugget') {
      geo = new THREE.IcosahedronGeometry(radius, 2);
    } else if (type === 'crystal') {
      geo = new THREE.DodecahedronGeometry(radius, 1);
    } else if (type === 'octahedron') {
      geo = new THREE.OctahedronGeometry(radius, 1);
    } else if (type === 'prism') {
      geo = new THREE.CylinderGeometry(radius * 0.4, radius * 0.75, radius * 2.2, 5);
    } else {
      geo = new THREE.TetrahedronGeometry(radius, 2);
    }

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      const scale = 1 + (Math.sin(vx * 14.0 + vy * 9.0 + vz * 16.0) * 0.45 + Math.cos(vy * 11.0 + vz * 13.0) * 0.45) * distortion;
      pos.setXYZ(i, vx * scale, vy * scale, vz * scale);
    }
    geo.computeVertexNormals();
    return geo;
  }

  // Create Element Pill Badge Canvas Texture — showing ONLY Metal Name (no symbol/atomic number)
  function createElementBadgeTexture(elem) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    // Draw pill background
    ctx.fillStyle = 'rgba(10, 13, 22, 0.88)';
    ctx.strokeStyle = elem.glow;
    ctx.lineWidth = 3;

    const x = 6, y = 6, w = 244, h = 68, r = 18;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Metal Name (centered bold)
    ctx.fillStyle = elem.glow;
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(elem.name, 128, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  const geoTypes = ['nugget', 'octahedron', 'crystal', 'prism', 'raw'];
  const floatingMetals = [];

  // Create 20 50%-sized flying 3D Lanthanide metal ore specimens
  for (let i = 0; i < 20; i++) {
    const elem = LANTHANIDE_ELEMENTS[i % LANTHANIDE_ELEMENTS.length];
    const geoType = geoTypes[i % geoTypes.length];
    // 50% radius size (0.08)
    const geo = createDeformedOreGeometry(geoType, 0.08, 0.28);

    const mat = new THREE.MeshPhongMaterial({
      color: elem.color,
      specular: elem.specular,
      shininess: 320,
      emissive: 0x0a0a10,
      flatShading: true,
      transparent: true,
      opacity: 0.88
    });

    const oreGroup = new THREE.Group();
    const mesh = new THREE.Mesh(geo, mat);
    oreGroup.add(mesh);

    // Micro Metal Name Badge Tag Sprite attached above ore (50% scale)
    const badgeTex = createElementBadgeTexture(elem);
    const spriteMat = new THREE.SpriteMaterial({ map: badgeTex, transparent: true, opacity: 0.90 });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.24, 0.075, 1);
    sprite.position.set(0, 0.14, 0);
    oreGroup.add(sprite);

    // Placement around outer screen margins
    const x = (Math.random() - 0.5) * 11;
    const y = (Math.random() - 0.5) * 9;
    const z = (Math.random() - 0.5) * 4 - 0.5;

    oreGroup.position.set(x, y, z);
    mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

    const scale = Math.random() * 0.25 + 0.45;
    oreGroup.scale.set(scale, scale, scale);

    const metalObj = {
      group: oreGroup,
      mesh: mesh,
      element: elem,
      speedY: Math.random() * 0.003 + 0.0018,
      speedX: (Math.random() - 0.5) * 0.0015,
      rotX: (Math.random() - 0.5) * 0.012 + 0.004,
      rotY: (Math.random() - 0.5) * 0.012 + 0.004,
      rotZ: (Math.random() - 0.5) * 0.01,
      wobbleSpeed: Math.random() * 1.0 + 0.4,
      wobbleOffset: Math.random() * Math.PI * 2
    };

    floatingMetals.push(metalObj);
    floatingMetalsGroup.add(oreGroup);
  }

  // Mouse interaction state
  let isDragging    = false;
  let prevMouseX    = 0;
  let prevMouseY    = 0;
  let rotVelX       = 0;
  let rotVelY       = 0;
  let autoRotate    = true;

  // Pointer events
  canvas.addEventListener('mousedown', (e) => {
    isDragging  = true;
    autoRotate  = false;
    prevMouseX  = e.clientX;
    prevMouseY  = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    rotVelY  = dx * 0.005;
    rotVelX  = dy * 0.005;
    crystalMesh.rotation.y += rotVelY;
    crystalMesh.rotation.x += rotVelX;
    wireMesh.rotation.y    += rotVelY;
    wireMesh.rotation.x    += rotVelX;
    innerMesh.rotation.y   -= rotVelY * 0.5;
    innerMesh.rotation.x   -= rotVelX * 0.5;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    // Resume auto-rotate after 2 seconds
    setTimeout(() => { autoRotate = true; }, 2000);
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    prevMouseX = t.clientX;
    prevMouseY = t.clientY;
    autoRotate = false;
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    const t  = e.touches[0];
    const dx = t.clientX - prevMouseX;
    const dy = t.clientY - prevMouseY;
    crystalMesh.rotation.y += dx * 0.005;
    crystalMesh.rotation.x += dy * 0.005;
    wireMesh.rotation.y    += dx * 0.005;
    wireMesh.rotation.x    += dy * 0.005;
    prevMouseX = t.clientX;
    prevMouseY = t.clientY;
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    setTimeout(() => { autoRotate = true; }, 2000);
  });

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (autoRotate) {
      crystalMesh.rotation.y += 0.003;
      crystalMesh.rotation.x  = Math.sin(t * 0.4) * 0.2;
      wireMesh.rotation.y    += 0.003;
      wireMesh.rotation.x     = crystalMesh.rotation.x;
      innerMesh.rotation.y   -= 0.005;
      innerMesh.rotation.z    = Math.cos(t * 0.3) * 0.15;
    }

    // Continuous 3D flight & tumbling animation of 15 Lanthanide rare earth metal specimens
    floatingMetals.forEach(m => {
      m.group.position.y += m.speedY;
      m.group.position.x += m.speedX + Math.sin(t * m.wobbleSpeed + m.wobbleOffset) * 0.0012;
      m.mesh.rotation.x += m.rotX;
      m.mesh.rotation.y += m.rotY;
      m.mesh.rotation.z += m.rotZ;

      // Wrap around visible viewport bounds (-5.5 to +5.5) for continuous floating effect
      if (m.group.position.y > 5.5) {
        m.group.position.y = -5.5;
        m.group.position.x = (Math.random() - 0.5) * 11;
      }
      if (m.group.position.x > 6.2)  m.group.position.x = -6.2;
      if (m.group.position.x < -6.2) m.group.position.x = 6.2;
    });

    // Pulsing lights
    pointLight1.intensity = 2.5 + Math.sin(t * 1.2) * 0.8;
    pointLight2.intensity = 1.8 + Math.cos(t * 0.9) * 0.6;
    pointLightRed.intensity = 2.2 + Math.sin(t * 1.4) * 0.7;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);
})();

/* ─────────────────────────────────────────────────
   3. NAVBAR — SCROLL & MOBILE TOGGLE
───────────────────────────────────────────────── */

(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  // Scroll: add/remove 'scrolled' class after 80px
  function onScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const target = navMenu.querySelector(`a[href="#${entry.target.id}"]`);
          if (target) target.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => observer.observe(s));
})();

/* ─────────────────────────────────────────────────
   4. SMOOTH SCROLL for all anchor links
───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─────────────────────────────────────────────────
   5. SCROLL REVEAL — Intersection Observer
───────────────────────────────────────────────── */
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.section-reveal');
  if (!reveals.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children slightly
          entry.target.style.transitionDelay = `${i * 0.05}s`;
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────────────
   6. MINERAL VAULT — Data, Rendering, Filtering, Modal
───────────────────────────────────────────────── */

const MINERALS = [
  {
    id:          'benitoite',
    name:        'Benitoite',
    formula:     'BaTiSi₃O₉',
    mohs:        '6 – 6.5',
    mohsNum:     6.25,
    system:      'Hexagonal',
    origin:      'California, USA',
    luminescence:'Luminescent blue under UV',
    categories:  ['Gemstone', 'Luminescent'],
    rarity:      'Extremely Rare',
    rarityColor: '#00F5D4',
    crystalColor:'#1a6bff',
    glowColor:   '#0044cc',
    description: 'Benitoite is one of the rarest gemstones in the world, found only in a single commercially productive deposit in San Benito County, California. Its extraordinary blue fluorescence under UV light makes it the state gem of California.',
    uses:        'Gemology, UV fluorescence research, collector specimens',
  },
  {
    id:          'painite',
    name:        'Painite',
    formula:     'CaZrBAl₉O₁₈',
    mohs:        '8',
    mohsNum:     8,
    system:      'Hexagonal',
    origin:      'Myanmar',
    luminescence:'Non-luminescent',
    categories:  ['Gemstone', 'Rare'],
    rarity:      'Ultra-Rare',
    rarityColor: '#9B5DE5',
    crystalColor:'#cc2200',
    glowColor:   '#881100',
    description: 'Once considered the world\'s rarest mineral, Painite was so scarce that only two crystals were known to exist for decades. Its deep red-orange hue and exceptional hardness make it highly prized by mineralogists and collectors worldwide.',
    uses:        'Collector specimens, scientific mineralogy research',
  },
  {
    id:          'alexandrite',
    name:        'Alexandrite',
    formula:     'BeAl₂O₄',
    mohs:        '8.5',
    mohsNum:     8.5,
    system:      'Orthorhombic',
    origin:      'Ural Mountains, Russia',
    luminescence:'Non-luminescent',
    categories:  ['Gemstone'],
    rarity:      'Very Rare',
    rarityColor: '#E0A96D',
    crystalColor:'#1a8c4a',
    glowColor:   '#0d5c30',
    description: 'Alexandrite is a colour-change variety of chrysoberyl — appearing green in daylight and red under incandescent light. This remarkable optical phenomenon is due to its unusual light absorption properties. A high-quality alexandrite can fetch more per carat than a diamond.',
    uses:        'Fine jewellery, laser technology, scientific study of chromism',
  },
  {
    id:          'monazite',
    name:        'Monazite',
    formula:     '(Ce,La,Nd,Th)PO₄',
    mohs:        '5 – 5.5',
    mohsNum:     5.25,
    system:      'Monoclinic',
    origin:      'Odisha, India',
    luminescence:'Weakly luminescent',
    categories:  ['Rare Earth', 'Critical'],
    rarity:      'Strategically Critical',
    rarityColor: '#00F5D4',
    crystalColor:'#bb8800',
    glowColor:   '#886600',
    description: 'Monazite is a critical phosphate mineral containing cerium, lanthanum, neodymium, and thorium — all essential rare earth elements. India\'s coastal sands in Odisha and Kerala hold vast monazite deposits central to the National Critical Mineral Mission.',
    uses:        'REE extraction, nuclear fuel cycle, catalysts, magnets',
  },
  {
    id:          'neodymium',
    name:        'Neodymium Ore',
    formula:     'Nd₂O₃',
    mohs:        '6',
    mohsNum:     6,
    system:      'Hexagonal',
    origin:      'India / China',
    luminescence:'Non-luminescent',
    categories:  ['Rare Earth', 'Critical'],
    rarity:      'Critical Material',
    rarityColor: '#00F5D4',
    crystalColor:'#7a00cc',
    glowColor:   '#5500aa',
    description: 'Neodymium is the cornerstone of modern permanent magnet technology — NdFeB magnets power everything from EV motors to wind turbines. India\'s push toward domestic neodymium production is central to its clean energy and defence independence strategy.',
    uses:        'Permanent magnets, EV motors, wind turbines, hard drives',
  },
  {
    id:          'hyalite',
    name:        'Hyalite Opal',
    formula:     'SiO₂·nH₂O',
    mohs:        '5.5 – 6',
    mohsNum:     5.75,
    system:      'Amorphous',
    origin:      'Zacatecas, Mexico',
    luminescence:'Bright green under UV',
    categories:  ['Gemstone', 'Luminescent'],
    rarity:      'Rare',
    rarityColor: '#E0A96D',
    crystalColor:'#00aa55',
    glowColor:   '#007733',
    description: 'Hyalite Opal is a colourless to pale variety of opal that exhibits a spectacular bright green fluorescence under UV light. When illuminated by shortwave UV, a fine hyalite specimen appears to glow like liquid neon — making it among the most photogenic of all luminescent minerals.',
    uses:        'UV fluorescence displays, collector specimens, gemology',
  },
  {
    id:          'spodumene',
    name:        'Lithium Spodumene',
    formula:     'LiAlSi₂O₆',
    mohs:        '6.5 – 7',
    mohsNum:     6.75,
    system:      'Monoclinic',
    origin:      'Karnataka, India',
    luminescence:'Non-luminescent',
    categories:  ['Critical'],
    rarity:      'Critical Material',
    rarityColor: '#00F5D4',
    crystalColor:'#cc6688',
    glowColor:   '#aa4466',
    description: 'Spodumene is the primary ore mineral of lithium, the irreplaceable element powering the global battery revolution. India\'s deposits in Karnataka and Rajasthan are being rapidly evaluated under the National Critical Mineral Mission as the country targets lithium independence for its EV and grid-storage ambitions.',
    uses:        'Lithium extraction, Li-ion batteries, ceramics, glass',
  },
  {
    id:          'fluorite',
    name:        'Fluorite',
    formula:     'CaF₂',
    mohs:        '4',
    mohsNum:     4,
    system:      'Cubic',
    origin:      'Global (incl. India)',
    luminescence:'Strong blue under UV',
    categories:  ['Luminescent'],
    rarity:      'Widespread',
    rarityColor: '#9B5DE5',
    crystalColor:'#00aacc',
    glowColor:   '#007799',
    description: 'Fluorite — the mineral that gave its name to fluorescence — is celebrated for its extraordinary range of colours and its intense blue-white glow under UV light. A critical industrial mineral, it is essential for making hydrofluoric acid, aluminium smelting, and high-purity optical components.',
    uses:        'Optics, aluminium smelting, HF acid production, steel flux',
  },
];

// Colour map for category tags
const CATEGORY_COLOURS = {
  'Gemstone':    'gold',
  'Luminescent': 'cyan',
  'Rare Earth':  'violet',
  'Critical':    'cyan',
  'Rare':        'violet',
};

/**
 * Render all mineral cards into #vaultGrid
 */
function renderMineralCards() {
  const grid = document.getElementById('vaultGrid');
  if (!grid) return;

  grid.innerHTML = '';

  MINERALS.forEach(m => {
    const card = document.createElement('article');
    card.className = 'mineral-card section-reveal';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${m.name} — click for details`);
    card.dataset.categories = m.categories.join(',');
    card.dataset.id = m.id;

    const tagHTML = m.categories.map(cat => {
      const cls = CATEGORY_COLOURS[cat] || 'cyan';
      return `<span class="tag tag--${cls}">${cat}</span>`;
    }).join('');

    card.innerHTML = `
      <div class="mineral-card__crystal-zone" style="background: radial-gradient(circle at 50% 50%, ${m.glowColor}22, transparent 70%);">
        <div class="crystal-shape" style="background: linear-gradient(135deg, ${m.crystalColor}, ${m.glowColor}); color: ${m.crystalColor};"></div>
      </div>
      <div class="mineral-card__body">
        <span class="mineral-card__rarity" style="background: ${m.rarityColor}18; color: ${m.rarityColor}; border: 1px solid ${m.rarityColor}30;">${m.rarity}</span>
        <div class="mineral-card__name">${m.name}</div>
        <div class="mineral-card__formula">${m.formula}</div>
        <div class="mineral-card__mohs">
          <span style="color: var(--gold)">◆</span> Mohs ${m.mohs} &nbsp;·&nbsp; ${m.system}
        </div>
        <div class="mineral-card__tags">${tagHTML}</div>
      </div>
    `;

    // Open modal on click or Enter/Space key
    card.addEventListener('click', () => openMineralModal(m));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMineralModal(m); }
    });

    grid.appendChild(card);
  });

  // Re-trigger scroll observer for newly created cards
  document.querySelectorAll('.mineral-card.section-reveal').forEach(el => {
    scrollRevealObserver && scrollRevealObserver.observe(el);
  });
}

// Keep a reference to the scroll observer so we can add new elements
let scrollRevealObserver = null;

(function initScrollRevealObserver() {
  scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
})();

/**
 * Filter buttons for Mineral Vault
 */
function initVaultFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.mineral-card').forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const cats = (card.dataset.categories || '').split(',');
          card.classList.toggle('hidden', !cats.includes(filter));
        }
      });
    });
  });
}

/* ── MINERAL MODAL ── */

let currentModalMineral = null;

/**
 * Open the mineral detail modal for a given mineral object
 */
function openMineralModal(mineral) {
  currentModalMineral = mineral;
  const modal   = document.getElementById('mineralModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  const tagHTML = mineral.categories.map(cat => {
    const cls = CATEGORY_COLOURS[cat] || 'cyan';
    return `<span class="tag tag--${cls}">${cat}</span>`;
  }).join('');

  const mohsPct = ((mineral.mohsNum / 10) * 100).toFixed(1);

  content.innerHTML = `
    <div class="modal-crystal-hero" style="background: radial-gradient(circle at 50% 50%, ${mineral.glowColor}33, ${mineral.crystalColor}11 60%, transparent);">
      <div class="crystal-shape" style="background: linear-gradient(135deg, ${mineral.crystalColor}, ${mineral.glowColor}); width:100px; height:100px; filter: drop-shadow(0 0 24px ${mineral.crystalColor}88);"></div>
    </div>

    <h2 class="modal-title gradient-text" id="modalTitle">${mineral.name}</h2>
    <p class="modal-formula">${mineral.formula}</p>

    <div class="modal-mohs-bar">
      <div class="modal-mohs-label">
        <span>Mohs Hardness: ${mineral.mohs}</span>
        <span style="color: var(--text-subtle)">Scale: 1–10</span>
      </div>
      <div class="mohs-track">
        <div class="mohs-fill" data-target="${mohsPct}" style="width: 0%;"></div>
      </div>
    </div>

    <div class="modal-grid">
      <div class="modal-field">
        <div class="modal-field__key">Crystal System</div>
        <div class="modal-field__val">${mineral.system}</div>
      </div>
      <div class="modal-field">
        <div class="modal-field__key">Primary Origin</div>
        <div class="modal-field__val">${mineral.origin}</div>
      </div>
      <div class="modal-field">
        <div class="modal-field__key">Luminescence</div>
        <div class="modal-field__val">${mineral.luminescence}</div>
      </div>
      <div class="modal-field">
        <div class="modal-field__key">Rarity</div>
        <div class="modal-field__val" style="color: ${mineral.rarityColor}">${mineral.rarity}</div>
      </div>
    </div>

    <div class="modal-field" style="margin-bottom: 1.25rem; padding: 1rem 1.25rem;">
      <div class="modal-field__key">Description</div>
      <div class="modal-field__val" style="line-height: 1.7; margin-top: 0.4rem;">${mineral.description}</div>
    </div>

    <div class="modal-field" style="margin-bottom: 1.5rem; padding: 1rem 1.25rem;">
      <div class="modal-field__key">Industrial Uses</div>
      <div class="modal-field__val" style="margin-top: 0.4rem;">${mineral.uses}</div>
    </div>

    <div class="modal-tags-row">${tagHTML}</div>
  `;

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Animate Mohs bar after render
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const fill = modal.querySelector('.mohs-fill');
      if (fill) fill.style.width = fill.dataset.target + '%';
    });
  });

  // Focus the close button
  document.getElementById('modalClose').focus();
}

/**
 * Close the mineral modal
 */
function closeMineralModal() {
  const modal = document.getElementById('mineralModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentModalMineral = null;
}

function initMineralModal() {
  const modalClose   = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  if (modalClose)    modalClose.addEventListener('click', closeMineralModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeMineralModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModalMineral) closeMineralModal();
  });
}



/* ─────────────────────────────────────────────────
   8. MULTI-STEP EXHIBITOR BOOKING FORM
───────────────────────────────────────────────── */

(function initBookingForm() {
  const form               = document.getElementById('bookingForm');
  const confirmationScreen = document.getElementById('confirmationScreen');
  const costDisplay        = document.getElementById('costDisplay');
  const costBreakdown      = document.getElementById('costBreakdown');
  if (!form) return;

  let currentStep = 1;
  const TOTAL_STEPS = 5;

  // ── Cost state ──
  let boothCost    = 0;
  let utilityCost  = 0;
  let boothLabel   = '';
  const utilitySelections = {};

  // ── Update cost display ──
  function updateCostDisplay() {
    const total = boothCost + utilityCost;
    costDisplay.textContent = formatINR(total);

    let breakdown = '';
    if (boothLabel) {
      breakdown += `<span style="color:var(--cyan)">${boothLabel}:</span> ${formatINR(boothCost)}`;
    }
    const utilKeys = Object.keys(utilitySelections).filter(k => utilitySelections[k].cost > 0);
    if (utilKeys.length > 0) {
      breakdown += ' &nbsp;+&nbsp; ';
      breakdown += utilKeys.map(k => `${utilitySelections[k].label}: ${formatINR(utilitySelections[k].cost)}`).join(', ');
    }
    costBreakdown.innerHTML = breakdown;
  }

  // ── Navigate to a step ──
  function goToStep(n) {
    if (n < 1 || n > TOTAL_STEPS) return;

    // Hide all steps
    form.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active');
      step.hidden = true;
    });

    // Show target step
    const targetStep = form.querySelector(`[data-step="${n}"]`);
    if (targetStep) {
      targetStep.hidden = false;
      targetStep.classList.add('active');
    }

    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((ps, idx) => {
      const stepNum = idx + 1;
      ps.classList.toggle('active',    stepNum === n);
      ps.classList.toggle('completed', stepNum < n);
      if (stepNum === n) ps.setAttribute('aria-current', 'step');
      else ps.removeAttribute('aria-current');
    });

    currentStep = n;

    // If navigating to step 5, build booking summary
    if (n === 5) buildBookingSummary();
  }

  // ── Validation ──
  function validateStep(stepNum) {
    let valid = true;

    function showError(id, msg) {
      const el = document.getElementById(`${id}-error`);
      const input = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (el) el.textContent = msg;
      if (input) input.classList.add('error');
      valid = false;
    }

    function clearError(id) {
      const el = document.getElementById(`${id}-error`);
      const input = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (el) el.textContent = '';
      if (input) input.classList.remove('error');
    }

    if (stepNum === 1) {
      const companyName = document.getElementById('companyName');
      const category    = document.getElementById('exhibitorCategory');
      const desc        = document.getElementById('companyDesc');

      clearError('companyName'); clearError('exhibitorCategory'); clearError('companyDesc');

      if (!companyName.value.trim()) {
        showError('companyName', 'Company name is required.');
      }
      if (!category.value) {
        showError('exhibitorCategory', 'Please select an exhibition sector.');
      }
      if (!desc.value.trim() || desc.value.trim().length < 20) {
        showError('companyDesc', 'Please provide a description of at least 20 characters.');
      }
    }

    if (stepNum === 2) {
      const selected = form.querySelector('input[name="boothTier"]:checked');
      const errEl    = document.getElementById('boothTier-error');
      if (!selected) {
        if (errEl) errEl.textContent = 'Please select a registration category.';
        valid = false;
      } else {
        if (errEl) errEl.textContent = '';
      }
    }

    if (stepNum === 4) {
      const desc = document.getElementById('specimenDesc');
      clearError('specimenDesc');
      if (!desc.value.trim() || desc.value.trim().length < 10) {
        showError('specimenDesc', 'Please describe your specimens (min 10 characters).');
      }
    }

    if (stepNum === 5) {
      const fields = [
        { id: 'contactName',  msg: 'Full name is required.' },
        { id: 'contactTitle', msg: 'Job title is required.' },
        { id: 'contactEmail', msg: 'A valid email address is required.' },
        { id: 'contactPhone', msg: 'Phone number is required.' },
      ];

      fields.forEach(f => {
        clearError(f.id);
        const el = document.getElementById(f.id);
        if (!el || !el.value.trim()) {
          showError(f.id, f.msg);
        } else if (f.id === 'contactEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
          showError('contactEmail', 'Please enter a valid email address.');
        }
      });

      const terms = document.getElementById('agreeTerms');
      clearError('agreeTerms');
      if (terms && !terms.checked) {
        showError('agreeTerms', 'You must agree to the Terms & Conditions.');
      }
    }

    return valid;
  }

  // ── Build booking summary (Step 5) ──
  function buildBookingSummary() {
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryContent) return;

    const companyName = document.getElementById('companyName').value.trim();
    const category    = document.getElementById('exhibitorCategory');
    const categoryText = category.options[category.selectedIndex]?.text || '—';
    const total       = boothCost + utilityCost;

    const utilLines = Object.values(utilitySelections)
      .filter(u => u.cost > 0)
      .map(u => `${u.label} (${formatINR(u.cost)})`)
      .join(', ') || 'None selected';

    summaryContent.innerHTML = `
      <div class="summary-row"><span class="summary-key">Company</span><span class="summary-val">${companyName || '—'}</span></div>
      <div class="summary-row"><span class="summary-key">Sector</span><span class="summary-val">${categoryText}</span></div>
      <div class="summary-row"><span class="summary-key">Registration Category</span><span class="summary-val">${boothLabel || 'Not selected'}</span></div>
      <div class="summary-row"><span class="summary-key">Category Fee</span><span class="summary-val">${formatINR(boothCost)}</span></div>
      <div class="summary-row"><span class="summary-key">Utilities</span><span class="summary-val" style="max-width:300px">${utilLines}</span></div>
      <div class="summary-row"><span class="summary-key">Utility Cost</span><span class="summary-val">${formatINR(utilityCost)}</span></div>
      <div class="summary-row" style="border-top: 1px solid var(--glass-border); margin-top:0.5rem; padding-top:0.75rem;">
        <span class="summary-key" style="font-weight:700; color: var(--text-primary)">Estimated Total</span>
        <span class="summary-val" style="color: var(--gold); font-family: var(--font-serif); font-size:1.1rem;">${formatINR(total)} + GST</span>
      </div>
    `;
  }

  // ── Booth tier selection → update cost ──
  form.querySelectorAll('.tier-radio').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        boothCost  = parseInt(radio.dataset.cost, 10) || 0;
        boothLabel = radio.dataset.label || '';
        updateCostDisplay();
      }
    });
  });

  // ── Utility checkbox → update cost ──
  form.querySelectorAll('.utility-check').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const cost  = parseInt(checkbox.dataset.cost, 10) || 0;
      const label = checkbox.dataset.label || checkbox.value;
      if (checkbox.checked) {
        utilitySelections[checkbox.value] = { cost, label };
      } else {
        delete utilitySelections[checkbox.value];
      }
      utilityCost = Object.values(utilitySelections).reduce((s, u) => s + u.cost, 0);
      updateCostDisplay();
    });
  });

  // ── Next buttons ──
  form.querySelectorAll('.btn--next').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.next, 10);
      if (validateStep(currentStep)) {
        goToStep(nextStep);
        // Scroll to form top
        const formSection = document.getElementById('exhibitor');
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Previous buttons ──
  form.querySelectorAll('.btn--prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.dataset.prev, 10);
      goToStep(prevStep);
    });
  });

  // ── Progress step click (allow going back to completed steps) ──
  document.querySelectorAll('.progress-step').forEach(ps => {
    ps.addEventListener('click', () => {
      const stepNum = parseInt(ps.dataset.step, 10);
      if (stepNum < currentStep) goToStep(stepNum);
    });
  });

  // ── Form submit ──
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    // Show confirmation
    form.closest('.form-wrapper').querySelector('.form-progress').style.display = 'none';
    form.closest('.form-wrapper').querySelector('.cost-estimator').style.display = 'none';
    form.style.display = 'none';

    const refId = generateRefId();
    const confirmRef = document.getElementById('confirmRef');
    if (confirmRef) confirmRef.textContent = refId;

    const confirmScreen = document.getElementById('confirmationScreen');
    if (confirmScreen) confirmScreen.hidden = false;

    // Scroll to confirmation
    confirmScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Initialize at step 1
  goToStep(1);
})();

/* ─────────────────────────────────────────────────
   9. FILE UPLOAD DRAG-AND-DROP
───────────────────────────────────────────────── */

(function initFileUpload() {
  const uploadZone  = document.getElementById('uploadZone');
  const fileInput   = document.getElementById('portfolioFiles');
  const fileList    = document.getElementById('uploadFileList');
  if (!uploadZone || !fileInput || !fileList) return;

  function renderFileList(files) {
    fileList.innerHTML = '';
    Array.from(files).forEach(file => {
      const item = document.createElement('div');
      item.className = 'upload-file-item';
      const sizeKB = (file.size / 1024).toFixed(1);
      item.textContent = `📄 ${file.name} (${sizeKB} KB)`;
      fileList.appendChild(item);
    });
  }

  // Click to open file dialog
  uploadZone.addEventListener('click', (e) => {
    if (e.target !== fileInput) fileInput.click();
  });

  // Keyboard accessibility
  uploadZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });

  // File input change
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) renderFileList(fileInput.files);
  });

  // Drag events
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-active');
  });

  uploadZone.addEventListener('dragleave', (e) => {
    if (!uploadZone.contains(e.relatedTarget)) {
      uploadZone.classList.remove('drag-active');
    }
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-active');
    const dt    = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      // Assign to file input (browser support varies; show list regardless)
      renderFileList(files);
    }
  });
})();

/* ─────────────────────────────────────────────────
   10. NEWSLETTER FORM
───────────────────────────────────────────────── */

(function initNewsletter() {
  const form    = document.getElementById('newsletterForm');
  const success = document.getElementById('newsletterSuccess');
  const input   = document.getElementById('newsletterEmail');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = '#FF6B6B';
      input.focus();
      return;
    }
    input.style.borderColor = '';
    // Simulate submission
    success.hidden = false;
    form.querySelector('.newsletter-form__row').style.display = 'none';
  });
})();

/* ─────────────────────────────────────────────────
   11. ECOSYSTEM SECTION TABS
───────────────────────────────────────────────── */

function initEcosystemTabs() {
  const tabBtns = document.querySelectorAll('.eco-tab-btn');
  const tabPanels = document.querySelectorAll('.eco-tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(panel => {
        if (panel.id === `eco-tab-${tabTarget}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────────
   12. INIT ALL MODULES ON DOM READY
───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  renderMineralCards();
  initVaultFilters();
  initMineralModal();
  initEcosystemTabs();

  // Trigger scroll reveal for all existing section-reveal elements
  document.querySelectorAll('.section-reveal').forEach(el => {
    if (scrollRevealObserver) scrollRevealObserver.observe(el);
  });

  // Hero stats "count-up" animation (lightweight version)
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) statsObserver.disconnect();
      });
    }, { threshold: 0.5 });
    statsObserver.observe(heroSection);
  }
});

