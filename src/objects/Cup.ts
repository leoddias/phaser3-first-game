export class Cup extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);                    
        this.setOrigin(0, 0);  
        this.setSize(25,25);
        this.setDisplaySize(32,32);                                                         
        params.scene.add.existing(this);
        params.scene.physics.world.enable(this); 
        this.body.setCollideWorldBounds(true); 
        this.body.setBounce(1); 
        this.body.allowGravity = false;
        this.body.setVelocity(Phaser.Math.Between(400, 700), 20);        
    }    
}