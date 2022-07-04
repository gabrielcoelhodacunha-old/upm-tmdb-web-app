function elementWithIdExists(id : string) : boolean {
  return document.getElementById(id) ? true : false;
}

export default elementWithIdExists;