import { apiKeyInput } from "constants/htmlElements";
import HttpClient from "utils/HttpClient";
import { GET } from "constants/httpMethods";
import IHttpRequest from "utils/IHttpRequest";
import removeAllWhiteSpaces from "utils/removeAllWhiteSpaces";
import { BASE_API_URL } from "constants/urls";

async function getListById(listId : string) : Promise<any> {
  const request : IHttpRequest = {
    url: removeAllWhiteSpaces(
      `${BASE_API_URL}
      /list/${listId}?
      api_key=${apiKeyInput.value}`
    ),
    method: GET
  };
  return await HttpClient.get(request);
}

export default getListById;