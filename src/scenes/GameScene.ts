import { Cloud } from "../objects/Cloud";
import { Dollar } from "../objects/Dollar";
import { Oldman } from "../objects/Oldman";
import { Cup } from "../objects/Cup";

export class GameScene extends Phaser.Scene {
    private oldMan: Oldman;
    private clouds: Phaser.GameObjects.Group;
    private dollars: Phaser.GameObjects.Group;        
    private cups: Phaser.GameObjects.Group;  
    private level: number;    

    constructor() {
        super({
          key: "GameScene"
        });
    }

    init(){
        this.clouds = this.add.group({ classType: Cloud });
        this.dollars = this.add.group({ classType: Dollar });                                  
        this.cups = this.add.group({ classType: Cup }); 
        this.level = 0;        
    }

    create(): void {            
        this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(800,600); 
        this.addClouds();
        this.addDollars();              
        this.oldMan = new Oldman({
            scene: this,
            x: 100,
            y: 500,
            key: "oldman"
        });                        
    }

    update(): void{
        this.physics.collide(this.oldMan, this.clouds.getChildren());
        this.physics.collide(this.clouds.getChildren(), this.dollars.getChildren());         
        
        this.oldMan.update();                     
        
        this.physics.overlap(this.oldMan, this.dollars, this.collectDollar, null, this);                          
        this.physics.overlap(this.oldMan, this.cups, this.gotDied, null, this);                          
    }

    private addClouds(): void{
        this.addOneCloud(10,430);                   
        this.addOneCloud(650, 220);        
        this.addOneCloud(350, 300);        
        this.addOneCloud(50, 130);
    }
    private addOneCloud(x, y): void {        
        let cloud = new Cloud({
          scene: this,
          x: x,
          y: y,
          key: "cloud"
        });            
        this.clouds.add(cloud);
    }

    private addDollars(): void{
        for(let i = 0, x = 12; i < 10; i++)
        {
            let dollar = new Dollar({
                key: "dollar",
                scene: this,
                x: x,
                y: 0,
                bounce: Phaser.Math.FloatBetween(0.4, 0.8)
            })
            x += 70;
            this.dollars.add(dollar);
        }
    }
    private collectDollar(oldman, dollar): void{
        dollar.destroy();        
        let currentScore = this.registry.get("score");
        this.registry.set("score", currentScore + 100);
        this.events.emit("scoreChanged");     
        if(this.dollars.countActive() === 0) // All dollars was collected
        {
            this.level++;
            this.addDollars();
            this.addCup(this.level);            
        }           
    }

    private addCup(count: number): void{
        for(let i = 0; i < count; i++)
        {
            let randomX = (this.oldMan.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            let cup = new Cup({
                key: "cup",
                scene: this,
                x: randomX,
                y: 20                
            })            
            this.cups.add(cup);
        }
    }
    private gotDied(oldman, cup): void{
        this.physics.pause();                
        this.oldMan.setTint(0xff0000);
        this.oldMan.play("turn");        
        this.time.delayedCall(2000, this.resetGame, [], this);
    }

    private resetGame(): void{                     
        this.scene.stop("HUDScene");
        this.scene.stop("GameScene");
        this.scene.start("LoadScene");
        this.scene.bringToTop("LoadScene");            
    }
}
