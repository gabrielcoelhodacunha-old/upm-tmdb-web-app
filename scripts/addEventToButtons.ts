import { authenticate } from "./authenticate";
import { procurarFilme } from "./handleMovies";
import { loginButton, searchButton, searchContainer, searchInput } from "./htmlElements";

function addEventToButtons() {
  loginButton.addEventListener('click', authenticate);
  searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) lista.outerHTML = "";
    let query = searchInput.value;
    let listaDeFilmes = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista"
    for (const item of listaDeFilmes.results) {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(item.original_title))
      ul.appendChild(li)
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
  });
}

export default addEventToButtons;