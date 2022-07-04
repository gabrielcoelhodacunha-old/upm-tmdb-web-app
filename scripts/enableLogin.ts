import toggleElements from "utils/toggleElements";

function enableLogin() : void {
  disableAllInputs();
  disableAllButtons();
  enableLoginInputs();
  enableLoginButtons();
}

function disableAllInputs() : void {
  toggleElements(true, "input");
}

function disableAllButtons() : void {
  toggleElements(true, "button");
}

function enableLoginInputs() : void {
  toggleElements(false, "#login_container input");
}

function enableLoginButtons() : void {
  toggleElements(false, "#login_container button");
}

export default enableLogin;