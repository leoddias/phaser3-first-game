export class Dollar extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);                    
        this.setOrigin(0, 0);  
        this.setSize(25,25);
        this.setDisplaySize(32,32);                                                 
        params.scene.add.existing(this);
        params.scene.physics.world.enable(this); 
        this.body.setBounce(params.bounce);
        this.body.setCollideWorldBounds(true);          
    }    
}