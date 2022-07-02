import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { GET } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function getListById(listId : string) : Promise<any> {
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /list/${listId}?
      api_key=${apiKeyInput.value}`
    ),
    method: GET
  };
  return await HttpClient.get(request);
}

export default getListById;