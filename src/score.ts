import * as PIXI from "pixi.js";
import { getScore } from "./state";

const number0 = PIXI.Texture.from("public/sprites/text/0.png");
const number1 = PIXI.Texture.from("public/sprites/text/1.png");
const number2 = PIXI.Texture.from("public/sprites/text/2.png");
const number3 = PIXI.Texture.from("public/sprites/text/3.png");
const number4 = PIXI.Texture.from("public/sprites/text/4.png");
const number5 = PIXI.Texture.from("public/sprites/text/5.png");
const number6 = PIXI.Texture.from("public/sprites/text/6.png");
const number7 = PIXI.Texture.from("public/sprites/text/7.png");
const number8 = PIXI.Texture.from("public/sprites/text/8.png");
const number9 = PIXI.Texture.from("public/sprites/text/9.png");

const numbers = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];

const NUM_DIGITS = 5;
const CHAR_WIDTH = 10;
const HIGH_SCORE_ALPHA = 0.7;

export class Score {
  digits: PIXI.AnimatedSprite[] = [];

  constructor(
    x: number,
    y: number,
    stage: PIXI.Container,
    alpha: number = 1.0
  ) {
    this.digits = [];

    for (let i = 0; i < NUM_DIGITS; i++) {
      this.digits.push(new PIXI.AnimatedSprite(numbers));
      this.digits[i].x = x + CHAR_WIDTH * i;
      this.digits[i].y = y;
      this.digits[i].alpha = alpha;
      stage.addChild(this.digits[i]);
    }
  }

  setValue(value: number) {
    if (value > Math.pow(10, NUM_DIGITS - 1)) {
      alert("Score overflow!");
    }

    for (let i = 0; i < NUM_DIGITS; i++) {
      this.digits[NUM_DIGITS - (i + 1)].currentFrame = value % 10;
      value = Math.floor(value / 10);
    }
  }
}

export class ScoreTicker {
  container: PIXI.Container = new PIXI.Container();
  highScorePrefix: PIXI.Sprite | null = null;
  highScore: Score | null = null;
  currentScore: Score | null = null;

  spawn(x: number, y: number, stage: PIXI.Container) {
    this.container.x = x;
    this.container.y = y;
    stage.addChild(this.container);

    this.highScorePrefix = PIXI.Sprite.from("public/sprites/text/hi.png");
    this.highScorePrefix.alpha = HIGH_SCORE_ALPHA;
    this.container.addChild(this.highScorePrefix);
    
    this.highScore = new Score(
      CHAR_WIDTH * 3,
      0,
      this.container,
      HIGH_SCORE_ALPHA
    );
    
    this.currentScore = new Score(CHAR_WIDTH * 9, 0, this.container);

    this.setHighScore(getScore());
  }

  update() {
    this.currentScore?.setValue(getScore());
  }

  setHighScore(value: number) {
    this.highScore?.setValue(value);
  }
}
