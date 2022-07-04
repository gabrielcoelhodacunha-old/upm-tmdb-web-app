import { CSS_HIDE_CLASS, CSS_SHOW_CLASS } from "constants/css";
import toggleElements from "utils/toggleElements";

function enablePage(
  container : HTMLDivElement, button : HTMLButtonElement
) : void {
  hideAllPagesContainers();
  disableAllPagesButtons();
  showElement(container);
  disableButton(button);
}

function hideAllPagesContainers() : void {
  const containers = document.querySelectorAll("#pesquisar_ou_listas div");
  
  containers.forEach(container => hideElement(container));
}

function disableAllPagesButtons() : void {
  toggleElements(false, "#pesquisar_ou_listas > button");
}

function showElement(element : Element) : void {
  removeCssClassFromElement(element, CSS_HIDE_CLASS);
  addCssClassToElement(element, CSS_SHOW_CLASS);
}

function disableButton(button : HTMLButtonElement) : void {
  button.disabled = true;
}

function hideElement(element : Element) : void {
  removeCssClassFromElement(element, CSS_SHOW_CLASS);
  addCssClassToElement(element, CSS_HIDE_CLASS);
}

function removeCssClassFromElement(
  element : Element, cssClass : string
) : void {
  element.classList.remove(cssClass);
}

function addCssClassToElement(element : Element, cssClass : string) : void {
  element.classList.add(cssClass);
}


export default enablePage;