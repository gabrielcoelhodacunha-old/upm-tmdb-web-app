import HTML_ELEMENTS from "./htmlElements";
import { HttpClient } from "./HttpClient";

loginButton.addEventListener('click', async () => {
  let rT = await criarRequestToken();
  console.log(rT);
});

async function criarRequestToken() : Promise<string> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  });
  return result.request_token;
}