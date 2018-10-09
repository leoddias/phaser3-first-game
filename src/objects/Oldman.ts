export class Oldman extends Phaser.GameObjects.Sprite {
    private moveKey: CursorKeys;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
                          
        this.setOrigin(0, 0);        
        this.setSize(23,48);
        this.moveKey = this.scene.input.keyboard.createCursorKeys();      
        params.scene.add.existing(this);
        this.initPhysics();                
        this.initAnimations();
    }
     
    update(): void{
        if(this.moveKey.left.isDown)
        {
            this.body.setVelocityX(-160);                
            this.anims.play("left",true);
        }
        else if(this.moveKey.right.isDown)
        {
            this.body.setVelocityX(160);
            this.anims.play("right",true);
        }
        else
        {
            this.body.setVelocityX(0);
            this.anims.play("turn",true);
        }
        if (this.moveKey.up.isDown && (this.body.onFloor() || this.body.touching.down))
        {            
            this.body.setVelocityY(-330);
        }                
    }

    initPhysics(): void{
        this.scene.physics.world.enable(this);  
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true); 
    }
    
    initAnimations():void{
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('oldman', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -20
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('oldman', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -20
        });
        this.scene.anims.create({
            key: 'turn',            
            frames: [{key: 'oldman', frame: 1}],
            frameRate: 20                        
        });
    }
}