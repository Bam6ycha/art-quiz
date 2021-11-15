import { Button } from "../buttons/Button";
import { Container } from "../Container/Container";
import { RangeInput } from "../inputs/Range";
import { NumberOrRangeInputParameters } from "../inputs/types";

const rangeInputData: NumberOrRangeInputParameters = {
  max: "1",

  min: "0",

  value: "0.3",

  step: "0.1"
};

class AudioPlayer {
  public element: HTMLDivElement;

  private container: Container;

  private audio: HTMLAudioElement;

  private soundBigButton: Button;

  private soundSmallButton: Button;

  private volume: RangeInput;

  private soundBarContainer: Container;

  private volumeButtonContainer: Container;

  private playlist: {
    correct: string[];
    incorrect: string[];
    roundEnd: string[];
  };

  constructor() {
    this.playlist = {
      correct: ["../assets/correct.mp3", "audio/mpeg"],
      incorrect: ["../assets/incorrect.mp3", "audio/mpeg"],
      roundEnd: ["../assets/roundEnd.mp3", "audio/mpeg"]
    };
    this.audio = this.createAudioElement();
    this.soundBigButton = new Button("volume");
    this.soundSmallButton = new Button("volume-small");
    this.volume = new RangeInput(rangeInputData);
    this.soundBarContainer = new Container("settings-main__soundBar", [
      this.soundSmallButton.element,
      this.volume.element
    ]);

    this.volumeButtonContainer = new Container(
      "settings-main__volumeButtonContainer",
      [this.soundBigButton.element]
    );
    this.container = new Container("settings-main__player", [
      this.audio,
      this.volumeButtonContainer.element,
      this.soundBarContainer.element
    ]);
    this.element = this.container.element;
    this.audio.volume = 0.3;
    this.volume.setValue("0.3");
    this.soundOffOnClick();
    this.setVolumeOnChange();
    this.checkVolume();
    this.setVolumeOnDomLoad();
  }

  showMuteButton() {
    this.soundBigButton
      .removeClassFromButtonElement("volume")
      .addClassToButtonElement("mute");
    this.soundSmallButton
      .removeClassFromButtonElement("volume-small")
      .addClassToButtonElement("mute-small");
    return this;
  }

  showUnmuteButton() {
    this.soundBigButton
      .removeClassFromButtonElement("mute")
      .addClassToButtonElement("volume");
    this.soundSmallButton
      .removeClassFromButtonElement("mute-small")
      .addClassToButtonElement("volume-small");
    return this;
  }

  checkVolume() {
    this.volume.onChange(() => {
      this.playCorrect();
    });
  }

  createAudioElement() {
    return document.createElement("audio");
  }

  isMute() {
    return this.audio.muted;
  }

  isPaused() {
    return this.audio.paused;
  }

  getVolume() {
    return this.audio.volume;
  }

  public returnDefaults() {
    this.audio.volume = 0.3;
    this.volume.setValue("0.3");
    this.showUnmuteButton();
    this.audio.muted = false;
    localStorage.setItem("isMuted", "false");
  }

  public getCurrentSource() {
    return this.audio.getAttribute("src");
  }

  public playCorrect() {
    const [source, type] = this.playlist.correct;
    this.audio.setAttribute("src", source);
    this.audio.setAttribute("type", type);
    this.togglePlay();
    return this;
  }

  public playIncorrect() {
    const [source, type] = this.playlist.incorrect;
    this.audio.setAttribute("src", source);
    this.audio.setAttribute("type", type);
    this.togglePlay();
    return this;
  }

  public playEndRound() {
    const [source, type] = this.playlist.roundEnd;
    this.audio.setAttribute("src", source);
    this.audio.setAttribute("type", type);
    this.togglePlay();
    return this;
  }

  private setVolumeOnChange() {
    this.volume.onChange(() => {
      this.audio.volume = +this.volume.value;
      localStorage.setItem("volume", `${this.getVolume()}`);
      localStorage.setItem("isMuted", `${this.isMute()}`);

      if (
        this.getVolume() === 0 &&
        this.soundBigButton.isContainsClass("volume")
      ) {
        this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
        this.showMuteButton();
        return this;
      }

      if (
        this.getVolume() !== 0 &&
        this.soundBigButton.isContainsClass("mute")
      ) {
        this.audio.muted = false;
        localStorage.setItem("isMuted", `${this.isMute()}`);

        this.showUnmuteButton();
      }
      return this;
    });
  }

  private setVolumeOnDomLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      const volume = localStorage.getItem("volume") ?? "0.3";
      const mute = localStorage.getItem("isMuted") ?? "false";
      if (mute === "true") {
        this.showMuteButton();
        this.volume.setValue("0");
      } else {
        this.audio.volume = +volume;
        this.volume.element.value = volume;
        this.showUnmuteButton();
      }
    });
  }

  private soundOffOnClick() {
    this.soundBigButton.OnClick(() => {
      if (this.soundBigButton.isContainsClass("volume")) {
        this.showMuteButton();
        this.volume.element.value = "0";
        this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
      } else {
        this.showUnmuteButton();
        this.volume.element.value = `${this.getVolume()}`;
        this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
      }
    });
  }

  public togglePlay() {
    if (this.isPaused()) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  private toggleSound() {
    if (this.isMute()) {
      this.audio.muted = false;
    } else {
      this.audio.muted = true;
    }
  }
}

const player = new AudioPlayer();

export { player };
