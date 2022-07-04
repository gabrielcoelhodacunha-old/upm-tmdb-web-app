import { sessionId } from "tmdb/authenticate";
import getListById from "tmdb/getListById";
import { apiKeyInput, loginInput } from "constants/htmlElements";
import HttpClient from "utils/HttpClient";
import { GET } from "constants/httpMethods";
import IHttpRequest from "utils/IHttpRequest";
import IMoviesList from "utils/IMoviesList";
import removeAllWhiteSpaces from "utils/removeAllWhiteSpaces";
import { BASE_API_URL } from "constants/urls";

let moviesLists : IMoviesList[] = [];

async function getMoviesLists() : Promise<void> {
  const request : IHttpRequest = {
    url: removeAllWhiteSpaces(
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