import toggleElements from "utils/toggleElements";

function disableLogin() : void {
  enableAllInputs();
  enableAllButtons();
  disableLoginInputs();
  disableLoginButtons();
}

function enableAllInputs() : void {
  toggleElements(false, "input");
}

function enableAllButtons() : void {
  toggleElements(false, "button");
}

function disableLoginInputs() : void {
  toggleElements(true, "#login_container input");
}

function disableLoginButtons() : void {
  toggleElements(true, "#login_container button");
}

export default disableLogin;