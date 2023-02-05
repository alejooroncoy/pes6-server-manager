import rdl from "node:readline";
import chalkTemplate from "chalk-template";

function textsForm(text) {
  if (text) {
    const v_text_before = this.prefixText.message
      .concat(!this.prefixText.value.length ? "" : " ")
      .concat(`V ${text}`);
    return [v_text_before];
  }
  const v_text_before = this.prefixText.message
    .concat(!this.prefixText.value.length ? "" : " ")
    .concat(`V ${this.cache}`);
  const v_text_after = this.prefixText.message
    .concat(!this.prefixText.value.length ? "" : " ")
    .concat(`V ${this["~text"]}`);
  return [v_text_before, v_text_after];
}

const rowsToDrain = (length) => parseInt(length / process.stdout.columns);

export default class Spinner {
  constructor({
    text = "",
    color = "",
    custom = {},
    spinner = "arc",
    prefixText = {
      value: "",
      message: "",
    },
  }) {
    this["@text"] = text;
    this.custom = custom || {};
    this.spinner = spinner;
    this.color = color;
    this.prefixText = prefixText;
  }
  errors = new Set();
  info = new Set();
  #callback = null;
  spinners = () =>
    Object.assign(this.custom, {
      arc: {
        interval: 100,
        frames: [
          chalkTemplate`{blue ◜}`,
          chalkTemplate`{hex('#41FFD0') ◠}`,
          chalkTemplate`{red ◝}`,
          chalkTemplate`{gray ◞}`,
          chalkTemplate`{yellow ◡}`,
          chalkTemplate`{white ◟}`,
        ],
      },
    });
  start = (text) => {
    if (text) Reflect.set(this, "@text", text);
    const { interval, frames } = Reflect.get(this.spinners(), this.spinner);
    /**
     * @name i
     * @type {Number}
     */
    let i = 0;
    process.stdout.write("\x1b[?25l");
    if (Object.keys(this.prefixText) > 0) {
      process.stdout.write(
        `${this.prefixText.value} ~ ${Reflect.get(this, "@text")}`
      );
    }
    const [v_text] = textsForm.call(this, Reflect.get(this, "@text"));
    if (v_text.length > process.stdout.columns) {
      rdl.clearLine(process.stdout, 0);
      rdl.moveCursor(process.stdout, 0, -rowsToDrain(v_text.length));
    }
    rdl.cursorTo(process.stdout, this.prefixText.message.length);
    this.timer = setInterval(() => {
      let now = frames[i];
      if (typeof now === "undefined") {
        i = 0;
        now = frames[i];
      }
      let text = (!this.prefixText.value.length ? "" : " ").concat(
        `${now} ${this.text}`
      );

      const [v_text_before, v_text_after] = textsForm.call(this);

      process.stdout.write(text, () => {
        if (v_text_after.length > process.stdout.columns) {
          if (v_text_before !== v_text_after) {
            rdl.clearLine(process.stdout, 0);
          }
          rdl.moveCursor(process.stdout, 0, -rowsToDrain(v_text_after.length));
        }

        rdl.cursorTo(process.stdout, this.prefixText.message.length);

        if (this.#callback) {
          this.#callback();
          this.#callback = null;
        }
        i = i >= frames.length ? 0 : i + 1;
      });
      this.cache = this["~text"];
    }, interval);
  };
  ["@text"] = "";
  ["~text"] = "";
  cache = "";
  set text(newText) {
    this.cache = this["~text"];
    rdl.clearLine(process.stdout, 1);
    const [newTextNormal, newTextParsed] = newText.split("|");
    Reflect.set(this, "@text", newTextNormal);
    this["~text"] = newTextParsed || newTextNormal;
    this.info.add(this["@text"]);
  }
  get text() {
    return this["@text"];
  }
  setError = (error) => this.errors.add(error);
  setTextPromise = (newText) =>
    new Promise((res) => {
      this.cache = this["~text"];
      rdl.clearLine(process.stdout, 1, () => {
        const [newTextNormal, newTextParsed] = newText.split("|");
        Reflect.set(this, "@text", newTextNormal);
        this["~text"] = newTextParsed || newTextNormal;
        this.#callback = res;
      });
    });
  stop = (messageStop = "") => {
    clearInterval(this.timer);
    rdl.clearLine(process.stdout, 1);

    process.stdout.write(
      (!this.prefixText.value.length ? "" : " ")
        .concat(messageStop)
        .concat(
          this.errors.size
            ? " ".concat(
                chalkTemplate`{red {bold {italic Found ${this.errors.size} ${
                  this.errors.size === 1 ? "error" : "errors"
                }}}}`
              )
            : ""
        )
        .trimEnd()
        .concat("\n")
    );
    process.stdout.write("\u001B[?25h");
  };
  stopped = false;
  pause = () => {
    this.stopped = true;
    this.stop();
  };
  play = () => {
    if (this.stopped) this.start();
  };
}
