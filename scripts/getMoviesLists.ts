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
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /account/${loginInput.value}/lists?
      api_key=${apiKeyInput.value}
      &session_id=${sessionId}`
    ),
    method: GET
  };
  const response = await HttpClient.get(request);
  moviesLists = [];
  for (const {id, name, description} of response.results) {
    const list = await getListById(id);
    const movies = list.items;
    moviesLists.push({id, name, description, movies});
  }
}

export { moviesLists, getMoviesLists };