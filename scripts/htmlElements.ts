const loginInput = document.getElementById('login') as HTMLInputElement;
const senhaInput = document.getElementById('senha') as HTMLInputElement;
const apiKeyInput = document.getElementById('api_key') as HTMLInputElement;
const loginButton = document.getElementById('login_button') as HTMLButtonElement;
const searchContainer = document.getElementById('search_container') as HTMLDivElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const searchButton = document.getElementById('search_button') as HTMLButtonElement;
const activateSearchButton = document.getElementById('activate_search_button') as HTMLButtonElement;
const activateListsButton = document.getElementById('activate_lists_button') as HTMLButtonElement;
const listsContainer = document.getElementById('lists_container') as HTMLDivElement;
const listNameInput = document.getElementById('list_name_input') as HTMLInputElement;
const listDescriptionTextarea = document.getElementById('list_description_textarea') as HTMLTextAreaElement;
const createListButton = document.getElementById('list_create_button') as HTMLButtonElement;

export {
  loginInput,
  senhaInput,
  apiKeyInput,
  loginButton,
  searchContainer,
  searchInput,
  searchButton,
  activateSearchButton,
  activateListsButton,
  listsContainer,
  listNameInput,
  listDescriptionTextarea,
  createListButton
};