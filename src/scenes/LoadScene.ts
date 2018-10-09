export class LoadScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;  
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];  
  
    constructor() {
      super({
        key: "LoadScene"
      });
    }

    init(): void {
      this.startKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      this.startKey.isDown = false;
      this.initRegistry();
    }

    preload(): void{
      this.load.pack(
        "preload",
        "./src/assets/pack.json",
        "preload"
      );  
    }
    update(): void {
      if (this.startKey.isDown) {
        this.scene.start("HUDScene");
        this.scene.start("GameScene");
        this.scene.bringToTop("HUDScene");                
      }
    }

    create(): void {
      this.bitmapTexts.push(
        this.add.bitmapText(
          this.sys.canvas.width / 2 - 65,
          this.sys.canvas.height / 2,
          "font",
          "PRESS SPACE TO BE MORE RICH",
          8
        )
      );
  
      this.bitmapTexts.push(
        this.add.bitmapText(
          this.sys.canvas.width / 2 -200,
          this.sys.canvas.height / 2 - 40,
          "font",
          "OLD MAN NEEDS TO BE MORE RICH",
          8
        )
      );
    }

    private initRegistry(): void {
      this.registry.set("score", 0);
  }
}