import * as THREE from "../three/three.module.js";

export function setupEnvironment(obj){
    initializeLights(obj);
    initializeScene(obj);
}

function initializeLights(obj){
    const DISTANCE = 500.0;
    const ANGLE = Math.PI/4.0;
    const PENUMBRA = 0.5;
    const DECAY = 1.0;

    let light = new THREE.SpotLight(0xffffff, 100.0, DISTANCE, ANGLE, PENUMBRA, DECAY);
    light.castShadow = true;
    light.shadow.bias = -0.00001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 100;

    light.position.set(0, 250, 25);
    light.lookAt(0, 0, 0);
    obj.scene.add(light);

    const UP_COLOR = 0xFFFF80;
    const DOWN_COLOR = 0x808080;
    light = new THREE.HemisphereLight(UP_COLOR, DOWN_COLOR, 1);
    light.color.setHSL( 0.6, 1, 0.6 );
    light.groundColor.setHSL( 0.095, 1, 0.75 );
    light.position.set(0, 20, 0);
    obj.scene.add(light);
}

function initializeScene(obj){
    const LOADER = new THREE.CubeTextureLoader().setPath("app/resources/skybox/");
        const TEXTURE = LOADER.load([
            "box_px.jpg",
            "box_nx.jpg",
            "box_py.jpg",
            "box_ny.jpg",
            "box_pz.jpg",
            "box_nz.jpg"
        ]);

        TEXTURE.encoding = THREE.sRGBEncoding;
        obj.scene.background = TEXTURE;

        const FLOOR = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial()
        )
        FLOOR.castShadow = false;
        FLOOR.receiveShadow = true;
        FLOOR.rotation.x = -Math.PI / 2;
        obj.scene.add(FLOOR);

        const WALL_1 = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 4),
            new THREE.MeshStandardMaterial()
        )
        WALL_1.position.set(0, -40, -50);
        WALL_1.castShadow = true;
        WALL_1.receiveShadow = true;
        obj.scene.add(WALL_1);

        const WALL_2 = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 4),
            new THREE.MeshStandardMaterial()
        )
        WALL_2.position.set(0, -40, 50);
        WALL_2.castShadow = true;
        WALL_2.receiveShadow = true;
        obj.scene.add(WALL_2);

        const WALL_3 = new THREE.Mesh(
            new THREE.BoxGeometry(4, 100, 100),
            new THREE.MeshStandardMaterial()
        )
        WALL_3.position.set(50, -40, 0);
        WALL_3.castShadow = true;
        WALL_3.receiveShadow = true;
        obj.scene.add(WALL_3);

        const WALL_4 = new THREE.Mesh(
            new THREE.BoxGeometry(4, 100, 100),
            new THREE.MeshStandardMaterial()
        )
        WALL_4.position.set(-50, -40, 0);
        WALL_4.castShadow = true;
        WALL_4.receiveShadow = true;
        obj.scene.add(WALL_4);
}