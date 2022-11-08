import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  SpriteManager,
  Sprite,
  Animation,
} from "@babylonjs/core";

class App {
  constructor() {
    // create the canvas html element and attach it to the webpage
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    // initialize babylon scene and engine
    var engine = new Engine(canvas, true);
    var scene = new Scene(engine);

    var camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    var light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene
    );

    const spriteManagerPlayer = new SpriteManager(
      "playerManager",
      "/vecteezy_cartoon-character-walking.png",
      1,
      { width: 180, height: 223 },
      scene
    );
    const player0 = new Sprite("player0", spriteManagerPlayer);
    // const player1 = new Sprite("player1", spriteManagerPlayer);

    // player0.cellIndex = 18;
    // player0.position.x = -1;
    player0.width = 0.4;
    player0.height = 0.4;
    player0.playAnimation(0, 2, true, 200);

    const startFrame = 0;
    const endFrame = 10;
    const frameRate = 5;

    const xSlide = new Animation(
      "xSlide",
      "position.x",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFrames = [];

    keyFrames.push({
      frame: startFrame,
      value: 0,
    });

    keyFrames.push({
      frame: endFrame,
      value: -1,
    });

    xSlide.setKeys(keyFrames);

    player0.animations.push(xSlide);

    scene.beginAnimation(player0, 0, frameRate, false, undefined, () => {
      player0.stopAnimation();
    });

    // player0 = new Vector3(0.1);
    // scene.debugLayer.show();
    // hide/show the Inspector
    // window.addEventListener("keydown", (ev) => {
    //   // Shift+Ctrl+Alt+I
    //   if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
    //     if (scene.debugLayer.isVisible()) {
    //       scene.debugLayer.hide();
    //     } else {
    //       scene.debugLayer.show();
    //     }
    //   }
    // });

    // run the main render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
new App();
