import * as PIXI from "pixi.js";

const number0 = PIXI.Texture.from('public/sprites/text/0.png');
const number1 = PIXI.Texture.from('public/sprites/text/1.png');
const number2 = PIXI.Texture.from('public/sprites/text/2.png');
const number3 = PIXI.Texture.from('public/sprites/text/3.png');
const number4 = PIXI.Texture.from('public/sprites/text/4.png');
const number5 = PIXI.Texture.from('public/sprites/text/5.png');
const number6 = PIXI.Texture.from('public/sprites/text/6.png');
const number7 = PIXI.Texture.from('public/sprites/text/7.png');
const number8 = PIXI.Texture.from('public/sprites/text/8.png');
const number9 = PIXI.Texture.from('public/sprites/text/9.png');

const numbers = [number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

const TEXT_WIDTH = 10;
const DIGITS = 5;

export class Score {
    digits: PIXI.AnimatedSprite[] = [];

    constructor(x: number, y: number, stage: PIXI.Container) {
        this.digits = [];

        for (let i = 0; i < DIGITS; i++) {
            this.digits.push(new PIXI.AnimatedSprite(numbers))
            this.digits[i].x = x + TEXT_WIDTH * i;
            this.digits[i].y = y;
            stage.addChild(this.digits[i])
        }
    }

    setValue(value: number) {
        if (value > Math.pow(10, DIGITS - 1)) {
            alert("Score overflow!");
        }

        for (let i = 0; i < DIGITS; i++) {
            this.digits[DIGITS - (i + 1)].currentFrame = value % 10;
            value = Math.floor(value / 10);
        }
    }
}