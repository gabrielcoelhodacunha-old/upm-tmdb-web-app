import THttpMethod from "utils/THttpMethod";

interface IHttpRequest {
  url: string,
  method: THttpMethod,
  body?: any
}

export default IHttpRequest;