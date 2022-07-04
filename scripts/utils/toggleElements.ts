function toggleElements(disabled : boolean, query : string) {
  const elements = document.querySelectorAll(query) as NodeListOf<any>;
  elements.forEach(element => element.disabled = disabled);
}

export default toggleElements;