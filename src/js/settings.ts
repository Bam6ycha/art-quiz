import { ButtonsWithText } from "./ButtonsWithText";
import { ButtonsWithImg } from "./ButtonsWithImg";
// import { Containers } from "./Containers";
function creatingSettingsPage() {
  const settingSaveButton = new ButtonsWithText(
    "SAVE",
    ".settings-footer",
    "settings-footer__cherryButton"
  );
  const settingDefaultButton = new ButtonsWithText(
    "DEFAULT",
    ".settings-footer",
    "settings-footer__cherryButton"
  );
  const settingSoundButtonBig = new ButtonsWithImg(
    "../assets/volume-on.svg",
    ".settings-main-volume",
    "volume"
  );
  const settingSoundButtonSmall = new ButtonsWithImg(
    "../assets/volume-off.svg",
    ".settings-main-volume",
    "volume-small"
  );
  const settingsClock = new ButtonsWithImg(
    "../assets/timer-picture.svg",
    ".settings-main-timer",
    "settings-clock"
  );
  console.log(
    settingSaveButton,
    settingDefaultButton,
    settingSoundButtonBig,
    settingSoundButtonSmall,
    settingsClock
  );
}

export { creatingSettingsPage };
