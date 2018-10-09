import "phaser";
import { LoadScene } from "./scenes/LoadScene";
import { GameScene } from "./scenes/GameScene";
import { HUDScene } from "./scenes/HUDScene";

/// <reference path="../../phaser.d.ts"/>

const config: GameConfig = {
    title: "Phaser3 BoilerPlate",
    type: Phaser.AUTO,
    width: 800,
    height: 600,   
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },         
    scene: [LoadScene,GameScene,HUDScene],
    input: {
        keyboard: true
    }
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
      super(config);            
    }
}
  
window.onload = () => {
    var game = new Game(config);    
};
  