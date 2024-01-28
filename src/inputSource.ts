type InputButton =
  | "quit"
  | "jump"
  | "down"
  | "left"
  | "right"
  | "action_a"
  | "action_b";

export type InputSource = {
  activeButtons: Set<InputButton>;
  prevActiveButtons: Set<InputButton>;
};

const keyboardMap = {
  escape: "quit",
  ArrowUp: "jump",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  " ": "jump",
} as const satisfies Record<string, InputButton>;

const isInputKey = (key: string): key is keyof typeof keyboardMap => {
  return key in keyboardMap;
};

export const inputSource_create = (): InputSource => {
  const activeButtons = new Set<InputButton>();
  const prevActiveButtons = new Set<InputButton>();

  return { activeButtons, prevActiveButtons };
};

export const inputSource_read = (source: InputSource) => {
  const pressedButtons = new Set<InputButton>();
  for (const key of source.activeButtons.values()) {
    if (!source.prevActiveButtons.has(key)) {
      pressedButtons.add(key);
    }
  }

  // prepare the input state for the next time it is read
  source.prevActiveButtons = new Set(source.activeButtons);

  return {
    activeButtons: source.activeButtons,
    pressedButtons,
  };
};

export const inputSource_handleKeyDown = (source: InputSource, key: string) => {
  if (isInputKey(key)) {
    source.activeButtons.add(keyboardMap[key]);
  }
};

export const inputSource_handleKeyUp = (source: InputSource, key: string) => {
  if (isInputKey(key)) {
    source.activeButtons.delete(keyboardMap[key]);
  }
};
