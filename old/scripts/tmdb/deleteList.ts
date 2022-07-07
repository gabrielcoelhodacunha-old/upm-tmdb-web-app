import { sessionId } from "tmdb/authenticate";
import { apiKeyInput } from "constants/htmlElements";
import HttpClient from "utils/HttpClient";
import { DELETE } from "constants/httpMethods";
import IHttpRequest from "utils/IHttpRequest";
import removeAllWhiteSpaces from "utils/removeAllWhiteSpaces";
import { BASE_API_URL } from "constants/urls";

async function deleteList(listId : number) : Promise<void> {
  try {
    const request : IHttpRequest = {
      url: removeAllWhiteSpaces(
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