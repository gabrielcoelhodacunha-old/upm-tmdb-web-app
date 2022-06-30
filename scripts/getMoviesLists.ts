import { sessionId } from "./authenticate";
import getListById from "./getListById";
import { apiKeyInput, loginInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { GET } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import IMoviesList from "./IMoviesList";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

let moviesLists : IMoviesList[];

async function getMoviesLists() : Promise<void> {
  const URL : string = removeWhiteSpaces(
    `${BASE_API_URL}
    /account/${loginInput.value}/lists?
    api_key=${apiKeyInput.value}
    &session_id=${sessionId}`
  );
  const REQUEST : IHttpRequest = { url: URL, method: GET };
  const RESULT = await HttpClient.get(REQUEST);
  moviesLists = [];
  for (let {id, name, description} of RESULT.results) {
    let list = await getListById(id);
    let movies = list.items;
    moviesLists.push({id, name, description, movies});
  }
}

export { moviesLists, getMoviesLists };