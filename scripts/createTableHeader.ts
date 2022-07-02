function createTableHeader(columns : string[]) : HTMLTableRowElement {
  const row = document.createElement("tr");

  columns.forEach(column => {
    const cell = document.createElement("th");
    cell.textContent = column;
    row.appendChild(cell);
  });

  return row;
}

export default createTableHeader;