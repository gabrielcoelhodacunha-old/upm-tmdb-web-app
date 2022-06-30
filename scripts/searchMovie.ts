import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { GET } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function searchMovie(query : string) : Promise<any> {
  const URL : string = removeWhiteSpaces(
    `${BASE_API_URL}
    /search/movie?
    api_key=${apiKeyInput.value}
    &query=${encodeURI(query)}`
  );
  const REQUEST : IHttpRequest = { url: URL, method: GET };
  return await HttpClient.get(REQUEST);
}

export default searchMovie;

