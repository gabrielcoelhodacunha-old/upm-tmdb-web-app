import THttpMethod from "./THttpMethod";

interface IHttpRequest {
  url: string,
  method: THttpMethod,
  body?: any
}

export default IHttpRequest;