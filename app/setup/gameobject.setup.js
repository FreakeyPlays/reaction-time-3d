import * as THREE from "../three/three.module.js";
import { PointerLockControls } from "../three/PointerLockControls.js";

export class setup{
    scene = null;
    renderer = null;
    camera = null;
    controls = null;
    blocker = null;
    instructions = null;
    button = null;
    hud = null;

    constructor(){
        this.setupScene();
        this.setupRenderer();
        this.setupCamera();
        this.setupControls();
        this.setupResize();
    }

    setupScene(){
        this.scene = new THREE.Scene();
    }

    setupRenderer(){
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.physicallyCorrectLights = true;
        document.body.appendChild(this.renderer.domElement);
    }

    setupCamera(){
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth/window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.y = 2;
    }

    setupControls(){
        this.blocker = document.getElementById("blocker");
        this.instructions = document.getElementById("instructions");
        this.button = document.getElementById("playButton");
        this.hud = document.getElementById("HUD");

        this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
        this.controls.addEventListener("lock", () => {
            this.instructions.style.display = "none";
            this.blocker.style.display = "none";
            this.hud.style.display = "flex";
        });
        this.controls.addEventListener("unlock", () => {
            this.blocker.style.display = "block";
			this.instructions.style.display = "";
            this.hud.style.display = "none";
        });

        this.button.addEventListener("click", () => {
            this.controls.lock();
        }, false)
    }

    setupResize(){
        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })   
    }
}