import * as THREE from "../three/three.module.js";
import { gameController } from "./game.controller.js";

const MIN_BOUNDARIES = -47;
const MAX_BOUNDARIES = 47;

export class inputControls{
    start = false;

    moveForward = false;
    moveLeft = false;
    moveBack = false;
    moveRight = false;

    clicked = false;

    velocity = new THREE.Vector3();
    direction = new THREE.Vector3();
    vertex = new THREE.Vector3();
    prevTime = performance.now();

    raycaster = null;

    constructor(obj){
        this.setupRaycaster(obj);
        this.gameController = new gameController(obj);

        window.addEventListener("keydown", e => this.onKeyDown(e), false);
        window.addEventListener("keyup", e => this.onKeyUp(e), false);
        window.addEventListener("click", e => this.onClick(e), false);
    
        this.update(obj);
    }

    update(obj){
        const time = performance.now();

        if(obj.controls.isLocked === true){
            this.move(time, obj);

            if(this.clicked){
                this.select(obj);
                this.clicked = false;
            }
        }

        this.prevTime = time;
    }

    move(time, obj){
        const DELTA = (time - this.prevTime) / 1000;

        this.velocity.x -= this.velocity.x * 10.0 * DELTA;
        this.velocity.z -= this.velocity.z * 10.0 * DELTA;
            
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.z = Number(this.moveForward) - Number(this.moveBack);
        this.direction.normalize();

        if(this.moveForward || this.moveBack){
            this.velocity.z -= this.direction.z * 400.0 * DELTA
        }
            
        if(this.moveLeft || this.moveRight){
            this.velocity.x -= this.direction.x * 400.0 * DELTA
        }

        obj.controls.moveRight(-this.velocity.x * DELTA);
        obj.controls.moveForward(-this.velocity.z * DELTA);

        this.checkBoundaries(obj);
    }

    checkBoundaries(obj){
        const pos = obj.controls.getObject().position;

        if(pos.x < MIN_BOUNDARIES){
            pos.x = MIN_BOUNDARIES;
        }

        if(pos.x > MAX_BOUNDARIES){
            pos.x = MAX_BOUNDARIES;
        }

        if(pos.z < MIN_BOUNDARIES){
            pos.z = MIN_BOUNDARIES;
        }

        if(pos.z > MAX_BOUNDARIES){
            pos.z = MAX_BOUNDARIES;
        }
    }

    select(obj){
        this.raycaster.setFromCamera(
            new THREE.Vector2(0, 0),
            obj.camera
        );

        const intersects = this.raycaster.intersectObjects(this.gameController.objects);

        if(intersects.length > 0){
            let color = intersects[0].object.material.color
            if(color.g === 1){
                this.gameController.continueGame();
            }else{
                this.gameController.endGame();
            }
        }
    }

    onKeyDown(e){
        switch(e.code){
            case "ArrowUp":
            case "KeyW":
                this.moveForward = true;
                break;

            case "ArrowLeft":
            case "KeyA":
                this.moveLeft = true;
                break;

            case "ArrowDown":
            case "KeyS":
                this.moveBack = true;
                break;

            case "ArrowRight":
            case "KeyD":
                this.moveRight = true;
                break;
            case "Space":
                this.gameController.startGame();
                break;
        }
    }

    onKeyUp(e){
        switch(e.code){
            case "ArrowUp":
            case "KeyW":
                this.moveForward = false;
                break;

            case "ArrowLeft":
            case "KeyA":
                this.moveLeft = false;
                break;

            case "ArrowDown":
            case "KeyS":
                this.moveBack = false;
                break;

            case "ArrowRight":
            case "KeyD":
                this.moveRight = false;
                break;
        }
    }

    onClick(e){
        this.clicked = true;
    }

    setupRaycaster(obj){
        this.raycaster = new THREE.Raycaster();
        this.raycaster.setFromCamera(
            new THREE.Vector2(0, 0),
            obj.camera
            );
    }
}