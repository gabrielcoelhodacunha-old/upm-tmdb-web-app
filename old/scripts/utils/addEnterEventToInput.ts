function addEnterEventToInput(input : HTMLInputElement, callback : any) : void {
  input.addEventListener("keypress",
    event => event.key === "Enter" ? callback() : null);
};

export default addEnterEventToInput;