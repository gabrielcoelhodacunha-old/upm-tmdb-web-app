import { sessionId } from "tmdb/authenticate";
import { getMoviesLists } from "tmdb/getMoviesLists";
import { apiKeyInput } from "constants/htmlElements";
import HttpClient from "utils/HttpClient";
import { POST } from "constants/httpMethods";
import IHttpRequest from "utils/IHttpRequest";
import removeAllWhiteSpaces from "utils/removeAllWhiteSpaces";
import { BASE_API_URL } from "constants/urls";

async function removeMovieFromList(
  movieId : string, listId : number
) : Promise<any> {
  const request : IHttpRequest = {
    url: removeAllWhiteSpaces(
      `${BASE_API_URL}
      /list/${listId}/remove_item?
      api_key=${apiKeyInput.value}
      &session_id=${sessionId}`
    ),
    method: POST,
    body: { media_id: movieId }
  };
  await HttpClient.get(request);
  await getMoviesLists();
}

export default removeMovieFromList;