export class JWTTokenResponse {

  constructor(accessToken: String, tokenType: String) {
    this.access_token = accessToken;
    this.token_type = tokenType;
  }

  public access_token: String;
  public token_type: String;
}
