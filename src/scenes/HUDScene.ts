export class HUDScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.BitmapText[];

    constructor() {
        super({
          key: "HUDScene"
        });
    }

    init(): void {
        this.scoreText = [];
    }

    create(): void {
        this.scoreText.push(
          this.add.bitmapText(
            10,
            10,
            "font",
            `Dollars $${this.registry.get("score")}`,
            8
          )
        );            
        const level = this.scene.get("GameScene");
        level.events.on("scoreChanged", this.updatePoints, this);        
      }

      private updatePoints() {
        this.scoreText[0].setText(`Dollars $${this.registry.get("score")}`);        
      }
}
