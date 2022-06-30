import { sessionId } from "./authenticate";
import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { DELETE } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function deleteList(listId : number) : Promise<void> {
  try {
    const URL : string = removeWhiteSpaces(
      `${BASE_API_URL}
      /list/${listId}?
      api_key=${apiKeyInput.value}
      &session_id=${sessionId}`
    );
    const REQUEST : IHttpRequest = { url: URL, method: DELETE };
    await HttpClient.get(REQUEST);
  } catch {};
}

export default deleteList;