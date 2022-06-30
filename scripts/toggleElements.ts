function toggleElements(disabled : boolean, query : string = "") {
  const ELEMENTS = document.querySelectorAll(query);
  ELEMENTS.forEach(
    element => (element as HTMLInputElement).disabled = disabled
  );
}

export default toggleElements;