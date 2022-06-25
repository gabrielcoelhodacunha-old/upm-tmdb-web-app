type THttpMethod = "POST" | "GET"

interface IHttpBody {
  username: string,
  password: string,
  request_token: string,
  session_id: string
}

interface IHttpRequest {
  url: string,
  method: THttpMethod,
  body?: IHttpBody | string | null
}

class HttpClient {
  static async get({url, method, body = null} : IHttpRequest) : Promise<IHttpBody> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

export {IHttpRequest, HttpClient};