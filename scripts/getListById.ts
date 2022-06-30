import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { GET } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function getListById(listId : string) : Promise<any> {
  const URL : string = removeWhiteSpaces(
    `${BASE_API_URL}
    /list/${listId}?
    api_key=${apiKeyInput.value}`
  );
  const REQUEST : IHttpRequest = { url: URL, method: GET };
  return await HttpClient.get(REQUEST);
}

export default getListById;