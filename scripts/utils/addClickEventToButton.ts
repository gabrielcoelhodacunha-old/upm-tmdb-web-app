function addClickEventToButton(
  button : HTMLButtonElement, callback : any
) : void {
  button.addEventListener("click", callback);
}

export default addClickEventToButton;