import { sessionId } from "./authenticate";
import { getMoviesLists } from "./getMoviesLists";
import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { POST } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function addMovieToList(
  movieId : string, listId : string
) : Promise<any> {
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /list/${listId}/add_item?
      api_key=${apiKeyInput.value}
      &session_id=${sessionId}` 
    ),
    method: POST,
    body: { media_id: movieId }
  }
  await HttpClient.get(request);
  await getMoviesLists();
}

export default addMovieToList;