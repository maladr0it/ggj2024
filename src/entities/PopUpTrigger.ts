import { state } from "../state";
import { Trigger } from "./Trigger";
// @ts-ignore
import Draggable from "draggable";

const template = (title: string, text: string) => `
<div class="popup">
  <div class="popup__title-bar">
    <div class="popup__title">${title}</div>
    <div class="popup__close"></div>
  </div>
  <div class="popup__contents">${text}</div>
</div>
`;

interface PopUpTriggerParams {
  x: number;
  title?: string;
  text: string;
}

let x = 80;
let y = 140;

export class PopUpTrigger extends Trigger {
  element?: HTMLElement;

  constructor({ x: triggerX, title = "Problem", text }: PopUpTriggerParams) {
    super(triggerX, () => {
      const element = createElement(template(title, text));
      const sceneRect = state.clipping.mask.getBounds();
      element.style.transform = `translate(${sceneRect.x + x}px, ${
        sceneRect.y + y
      }px)`;
      const close = element.querySelector(".popup__close");
      close?.addEventListener("click", () => {
        element.remove();
      });
      document.body.appendChild(element);
      new Draggable(element, {
        handle: element.querySelector(".popup__title-bar"),
      });
      x += 20;
      y += 20;
      this.element = element;
    });
  }
  cleanup(): void {
    this.element?.remove();
  }
}

const createElement = (html: string) =>
  new DOMParser().parseFromString(html, "text/html").body
    .firstChild as HTMLElement;
