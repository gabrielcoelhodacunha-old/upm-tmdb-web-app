import { sessionId } from "tmdb/authenticate";
import { moviesLists } from "tmdb/getMoviesLists";
import { apiKeyInput } from "constants/htmlElements";
import HttpClient from "utils/HttpClient";
import { POST } from "constants/httpMethods";
import IHttpRequest from "utils/IHttpRequest";
import IMoviesList from "utils/IMoviesList";
import removeAllWhiteSpaces from "utils/removeAllWhiteSpaces";
import { BASE_API_URL } from "constants/urls";

async function createList(
  name : string, description : string
) : Promise<IMoviesList | void> {
  if (moviesLists.some(list => list.name === name)) {
    return alert(`A lista '${name}' ja existe!`);
  }
  if (!name) return alert(`O campo 'Nome' deve ser preenchido!`);
  const request : IHttpRequest = {
    url: removeAllWhiteSpaces(
      `${BASE_API_URL}
      /list?
      api_key=${apiKeyInput.value}
      &session_id=${sessionId}`
    ),
    method: POST,
    body: {
      name: name,
      description: description,
      language: "pt-br"
    }
  };
  const response = await HttpClient.get(request);
  return {id: response.list_id, name, description} as IMoviesList;
}

export default createList;