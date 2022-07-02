import { sessionId } from "./authenticate";
import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { DELETE } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function deleteList(listId : number) : Promise<void> {
  try {
    const request : IHttpRequest = {
      url: removeWhiteSpaces(
        `${BASE_API_URL}
        /list/${listId}?
        api_key=${apiKeyInput.value}
        &session_id=${sessionId}`
      ),
      method: DELETE
    };
    await HttpClient.get(request);
  } catch {};
}

export default deleteList;