import { clamp, lerp } from "./math";

export class Tween {
  duration: number;
  easing: (t: number) => number;
  time = 0;
  progress = 0;
  get done() {
    return this.progress === 1;
  }
  constructor(duration: number, easing = (t: number): number => t) {
    this.duration = duration;
    this.easing = easing;
  }
  update(dt: number) {
    this.time += dt;
    this.progress = clamp(this.time / this.duration, 0, 1);
    this.progress = this.easing(this.progress);
    return this.progress;
  }
  lerp(from: number, to: number) {
    return lerp(from, to, this.progress);
  }
}
