import * as THREE from "../three/three.module.js";
import { endCount, resetTime, startCount, updateHighscore } from "./highscore.controller.js";

const MIN_BOUNDARY = -47;
const MAX_BOUNDARY = 47;

const MAX_OBJECTS = 32;
const WRONG_COLOR = 0xff0000;
const RIGHT_COLOR = 0x00ff00;

const MAX_COUNT = 5;

export class gameController{
    activeGame = null;
    startTimeInMs = null;
    objects = null;
    colors = null;
    activeCount = null;

    activeCountHUD = null;
    responseHUD = null;

    obj = null;

    constructor(obj){
        this.obj = obj;
        this.activeGame = false;
        this.objects = [];

        this.activeCountHUD = document.getElementById("HUDCount");
        this.responseHUD = document.getElementById("HUDResponse");
    }

    startGame(){
        if(this.activeGame === false){
            this.activeGame = true;
            this.activeCount = 0;
            this.startTimeInMs = performance.now();

            this.activeCountHUD.innerText = this.activeCount + "/" + MAX_COUNT;
            this.activeCountHUD.parentElement.style.display = "flex";

            this.createObjects();
            startCount();
        }
    }

    continueGame(){
        this.activeCount++;
        this.activeCountHUD.innerText = this.activeCount + "/" + MAX_COUNT;

        if(this.activeCount < MAX_COUNT){
            this.createObjects();
        }else{
            this.winGame()
        }
    }

    endGame(){
        endCount();

        this.responseHUD.innerText = "TRY AGAIN";
        this.responseHUD.parentElement.style.display = "block";

        this.removeOldObjects();

        setTimeout(() => {
            this.activeGame = false;
            this.activeCount = null;

            this.activeCountHUD.parentElement.style.display = "none";
            this.responseHUD.parentElement.style.display = "none";
            resetTime();
        }, 3000)
    }

    winGame(){
        endCount();
        this.responseHUD.innerText = "YOU WON";
        this.responseHUD.parentElement.style.display = "block";

        this.removeOldObjects();

        setTimeout(() => {
            updateHighscore();
            this.activeGame = false;
            this.activeCount = null;

            this.activeCountHUD.parentElement.style.display = "none";
            this.responseHUD.parentElement.style.display = "none";
            resetTime();
        }, 3000)
    }

    createObjects(){
        if(this.objects.length > 0){
            this.removeOldObjects();
        }

        for(let i = 0; i < MAX_OBJECTS; i++){
            const ball = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                new THREE.MeshStandardMaterial({ color: i < MAX_OBJECTS -1 ? WRONG_COLOR : RIGHT_COLOR })
            )
            ball.position.set(this.getRandomXZ(), this.getRandomY(), this.getRandomXZ());
            ball.castShadow = true;
            ball.name = "target";

            this.obj.scene.add(ball);
            this.objects.push(ball);
        }
    }

    removeOldObjects(){
        for(let i = 0; i < this.objects.length; i++){
            let test = this.obj.scene.getObjectByName("target");
        
            if(test){
                this.obj.scene.remove(test);
            }
        }

        this.objects = [];
    }

    getRandomXZ(){
        return Math.floor(Math.random() * (MAX_BOUNDARY - MIN_BOUNDARY + 1)) + MIN_BOUNDARY;
    }

    getRandomY(){
        return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    }
}