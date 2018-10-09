export class Cloud extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);                    
        this.setOrigin(0, 0);
        this.setSize(115,30);
        this.setDisplaySize(120,32);        
        params.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = true;        
        params.scene.add.existing(this);
    }    
}