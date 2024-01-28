import { Trigger } from "./Trigger";

export class PopUpTrigger extends Trigger {
  constructor(offset: number, title: string, text: string) {
    super(offset, () => {});
  }
}
