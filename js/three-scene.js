// ==========================================
// NUNIX ADS - 3D APPLIANCE SHOWROOM
// HTML + CSS + JAVASCRIPT + THREE.JS
// ==========================================

import * as THREE from "three";

import { OrbitControls } from
    "three/addons/controls/OrbitControls.js";

import { RoundedBoxGeometry } from
    "three/addons/geometries/RoundedBoxGeometry.js";


// ==========================================
// 1. MATERIALS
// ==========================================

const materials = {

    steel: new THREE.MeshStandardMaterial({
        color: 0x858b92,
        metalness: 0.65,
        roughness: 0.3
    }),

    black: new THREE.MeshStandardMaterial({
        color: 0x17191d,
        metalness: 0.35,
        roughness: 0.32
    }),

    glass: new THREE.MeshPhysicalMaterial({
        color: 0x101d2a,
        metalness: 0.15,
        roughness: 0.12,
        clearcoat: 1
    }),

    silver: new THREE.MeshStandardMaterial({
        color: 0xc9cdd2,
        metalness: 0.75,
        roughness: 0.22
    }),

    burgundy: new THREE.MeshStandardMaterial({
        color: 0x8b1538,
        metalness: 0.35,
        roughness: 0.3
    }),

    darkMetal: new THREE.MeshStandardMaterial({
        color: 0x34383d,
        metalness: 0.6,
        roughness: 0.3
    }),

    display: new THREE.MeshStandardMaterial({
        color: 0x65d8c0,
        emissive: 0x138c79,
        emissiveIntensity: 0.4
    })

};


// ==========================================
// 2. REUSABLE 3D SHAPES
// ==========================================

function addBox(
    parent,
    width,
    height,
    depth,
    material,
    x = 0,
    y = 0,
    z = 0
) {

    const geometry = new RoundedBoxGeometry(
        width,
        height,
        depth,
        4,
        0.035
    );

    const mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.position.set(x, y, z);

    parent.add(mesh);

    return mesh;
}


// CYLINDER HELPER

function addCylinder(
    parent,
    radius,
    height,
    material,
    x,
    y,
    z
) {

    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            32
        ),
        material
    );

    mesh.position.set(x, y, z);

    parent.add(mesh);

    return mesh;
}


// BURNER HELPER

function addBurner(parent, x, y, z) {

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
            0.22,
            0.035,
            12,
            48
        ),
        materials.silver
    );

    ring.rotation.x = -Math.PI / 2;

    ring.position.set(x, y, z);

    parent.add(ring);


    addCylinder(
        parent,
        0.13,
        0.055,
        materials.black,
        x,
        y,
        z
    );


    // Burner support bars

    addBox(
        parent,
        0.55,
        0.035,
        0.045,
        materials.darkMetal,
        x,
        y + 0.045,
        z
    );

    addBox(
        parent,
        0.045,
        0.035,
        0.55,
        materials.darkMetal,
        x,
        y + 0.045,
        z
    );

}


// ==========================================
// 3. LARGE FREESTANDING GAS COOKER
// ==========================================

function createCooker() {

    const group = new THREE.Group();

    // Main stainless steel body
    addBox(
        group, 2.4, 2.0, 1.35,
        materials.steel,
        0, -0.12, 0
    );

    // Top cooking surface
    addBox(
        group, 2.48, 0.12, 1.48,
        materials.black,
        0, 0.92, 0
    );

    // Rear splash guard
    addBox(
        group, 2.4, 0.4, 0.08,
        materials.steel,
        0, 1.14, -0.69
    );

    // Four burners
    [
        [-0.6, -0.34],
        [0.6, -0.34],
        [-0.6, 0.34],
        [0.6, 0.34]
    ].forEach(([x, z]) => {

        addBurner(
            group, x, 1.035, z
        );

    });

    // Control panel
    addBox(
        group, 2.25, 0.29, 0.08,
        materials.black,
        0, 0.65, 0.7
    );

    // Control knobs
    [-0.82, -0.28, 0.28, 0.82]
        .forEach(x => {

            const knob = addCylinder(
                group,
                0.09,
                0.08,
                materials.silver,
                x,
                0.65,
                0.79
            );

            knob.rotation.x = Math.PI / 2;

        });

    // Oven door
    addBox(
        group, 2.15, 1.25, 0.085,
        materials.black,
        0, -0.38, 0.72
    );

    // Oven glass
    addBox(
        group, 1.82, 0.82, 0.025,
        materials.glass,
        0, -0.45, 0.78
    );

    // Oven handle
    addBox(
        group, 1.78, 0.075, 0.11,
        materials.silver,
        0, 0.22, 0.82
    );

    // Lower trim
    addBox(
        group, 2.3, 0.11, 0.12,
        materials.darkMetal,
        0, -1.02, 0.64
    );

    // Feet
    [-0.9, 0.9].forEach(x => {

        [-0.45, 0.45].forEach(z => {

            addCylinder(
                group,
                0.1,
                0.17,
                materials.black,
                x,
                -1.21,
                z
            );

        });

    });

    return group;
}


// ==========================================
// 4. MODERN TABLETOP GAS STOVE
// ==========================================

function createStove() {

    const group = new THREE.Group();

    // Main body
    addBox(
        group, 2.75, 0.35, 1.55,
        materials.steel,
        0, -0.15, 0
    );

    // Black glass surface
    addBox(
        group, 2.65, 0.055, 1.46,
        materials.black,
        0, 0.05, 0
    );

    // Two large burners
    addBurner(
        group, -0.7, 0.13, -0.12
    );

    addBurner(
        group, 0.7, 0.13, -0.12
    );

    // Front control panel
    addBox(
        group, 2.6, 0.16, 0.06,
        materials.darkMetal,
        0, -0.2, 0.8
    );

    // Two control knobs
    [-0.7, 0.7].forEach(x => {

        const knob = addCylinder(
            group,
            0.105,
            0.08,
            materials.silver,
            x,
            -0.19,
            0.86
        );

        knob.rotation.x = Math.PI / 2;

    });

    // Base supports
    [-1.05, 1.05].forEach(x => {

        [-0.5, 0.5].forEach(z => {

            addCylinder(
                group,
                0.09,
                0.12,
                materials.black,
                x,
                -0.38,
                z
            );

        });

    });

    return group;
}


// ==========================================
// 5. MODERN DIGITAL MICROWAVE
// ==========================================

function createMicrowave() {

    const group = new THREE.Group();

    // Main body
    addBox(
        group, 2.7, 1.65, 1.55,
        materials.steel,
        0, 0, 0
    );

    // Front face
    addBox(
        group, 2.55, 1.45, 0.075,
        materials.black,
        0, 0, 0.81
    );

    // Door border
    addBox(
        group, 1.9, 1.25, 0.085,
        materials.silver,
        -0.3, 0, 0.86
    );

    // Dark glass window
    addBox(
        group, 1.72, 1.07, 0.02,
        materials.glass,
        -0.3, 0, 0.92
    );

    // Door handle
    addBox(
        group, 0.065, 0.9, 0.13,
        materials.silver,
        0.58, 0, 1.0
    );

    // Digital display
    addBox(
        group, 0.46, 0.23, 0.03,
        materials.display,
        1.02, 0.48, 0.87
    );

    // Control buttons
    [0.13, -0.1, -0.33].forEach(y => {

        addBox(
            group, 0.35, 0.1, 0.045,
            materials.silver,
            1.02, y, 0.88
        );

    });

    // Main control dial
    const dial = addCylinder(
        group,
        0.13,
        0.08,
        materials.silver,
        1.02,
        -0.56,
        0.91
    );

    dial.rotation.x = Math.PI / 2;

    // Microwave feet
    [-0.95, 0.95].forEach(x => {

        [-0.48, 0.48].forEach(z => {

            addCylinder(
                group,
                0.09,
                0.12,
                materials.black,
                x,
                -0.88,
                z
            );

        });

    });

    return group;
}


// ==========================================
// 6. CREATE INDIVIDUAL 3D VIEWERS
// ==========================================

function createViewer(containerId, modelFunction) {

    const container = document.getElementById(
        containerId
    );

    if (!container) {
        console.error(
            "Missing 3D container:",
            containerId
        );
        return;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        35,
        1,
        0.1,
        100
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(
        new THREE.HemisphereLight(
            0xffffff,
            0x777777,
            2
        )
    );

    const keyLight = new THREE.DirectionalLight(
        0xffffff,
        3.5
    );

    keyLight.position.set(5, 7, 6);

    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    fillLight.position.set(-5, 3, -4);

    scene.add(fillLight);

    // Create appliance
    const appliance = modelFunction();

    scene.add(appliance);

    // Ground shadow
    const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(1.35, 48),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.08,
            depthWrite: false
        })
    );

    shadow.rotation.x = -Math.PI / 2;

    shadow.position.y =
        containerId === "stove-3d" ? -0.5 : -1.4;

    scene.add(shadow);

    // Mouse controls
    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;

    controls.target.set(0, 0, 0);

    // Camera distance depends on appliance
    const distance = containerId === "stove-3d"
        ? 4.8
        : 5.4;

    const cameraDirection = new THREE.Vector3(
        0.52, 0.3, 1
    ).normalize();

    // Fit the model into its card
    function resize() {

        const width = container.clientWidth;
        const height = container.clientHeight;

        if (!width || !height) return;

        const aspect = width / height;

        camera.aspect = aspect;

        camera.updateProjectionMatrix();

        // Back camera away when card is narrow
        const fit = Math.max(
            1,
            0.95 / aspect
        );

        camera.position.copy(
            cameraDirection.clone()
                .multiplyScalar(distance * fit)
        );

        controls.minDistance = 3;
        controls.maxDistance = 10;

        controls.update();

        renderer.setSize(width, height);
    }

    resize();

    new ResizeObserver(resize).observe(container);

    // Stop auto rotation while dragging
    let dragging = false;

    renderer.domElement.addEventListener(
        "pointerdown",
        () => {
            dragging = true;
            controls.autoRotate = false;
        }
    );

    window.addEventListener(
        "pointerup",
        () => {
            if (dragging) {
                dragging = false;
                controls.autoRotate = true;
            }
        }
    );

    // Render only while visible
    let visible = true;

    new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
    }).observe(container);

    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        if (!visible || document.hidden) {
            clock.getDelta();
            return;
        }

        const time = clock.getElapsedTime();

        // Gentle floating effect
        appliance.position.y =
            Math.sin(time * 1.1) * 0.045;

        controls.update();

        renderer.render(scene, camera);
    }

    animate();
}


// ==========================================
// 7. INITIALIZE ALL THREE APPLIANCES
// ==========================================

createViewer("cooker-3d", createCooker);

createViewer("stove-3d", createStove);

createViewer("microwave-3d", createMicrowave);


// ==========================================
// END - NUNIX ADS 3D SHOWROOM
// ==========================================