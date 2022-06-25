import HTML_ELEMENTS from './htmlElements';
let { loginInput, senhaInput, apiKeyInput, loginButton } = {...HTML_ELEMENTS};

class HandleInputs {
  private _username = '';
  private _password = '';
  private _apiKey = '';

  preencherLogin() : void {
    this._username =  loginInput.value;
    this.validateLoginButton();
  }

  preencherSenha() : void {
    this._password = senhaInput.value;
    this.validateLoginButton();
  }

  preencherApi() : void {
    this._apiKey = apiKeyInput.value;
    this.validateLoginButton();
  }
  
  validateLoginButton() : void {
    if (this._password && this._username && this._apiKey) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }
  
  getApiKey() : string {
    return this._apiKey;
  }
}

export default HandleInputs;