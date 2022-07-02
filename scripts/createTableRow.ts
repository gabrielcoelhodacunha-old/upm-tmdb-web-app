function createTableRow(elements : any[][]) : HTMLTableRowElement {
  const row = document.createElement("tr");

  elements.forEach(columnElements => {
    const cell = createTableData(columnElements);
    row.appendChild(cell);
  });

  return row;
}

function createTableData(elements : Element[]) : HTMLTableCellElement {
  const data = document.createElement("td");

  elements.forEach(element => data.appendChild(element));

  return data;
}

export default createTableRow;