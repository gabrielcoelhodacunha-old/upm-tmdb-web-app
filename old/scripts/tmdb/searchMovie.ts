import { apiKeyInput } from "constants/htmlElements";
import HttpClient from "utils/HttpClient";
import { GET } from "constants/httpMethods";
import IHttpRequest from "utils/IHttpRequest";
import removeAllWhiteSpaces from "utils/removeAllWhiteSpaces";
import { BASE_API_URL } from "constants/urls";

async function searchMovie(query : string) : Promise<any> {
  const URL : string = removeAllWhiteSpaces(
    `${BASE_API_URL}
    /search/movie?
    api_key=${apiKeyInput.value}
    &query=${encodeURI(query)}`
  );
  const REQUEST : IHttpRequest = { url: URL, method: GET };
  return await HttpClient.get(REQUEST);
}

export default searchMovie;

