import { setup } from "./setup/gameobject.setup.js";
import { setupEnvironment } from "./setup/environment.setup.js";
import { inputControls } from "./controller/input.controller.js";
import { updateHighscore, updateScore } from "./controller/highscore.controller.js";

window.onload = () => {

    const obj = new setup();
    setupEnvironment(obj);

    const input = new inputControls(obj);
    updateHighscore();

    function animate() {
        requestAnimationFrame(animate)

        updateScore();
        input.update(obj);
        obj.renderer.render(obj.scene, obj.camera)
    }

    animate();

}