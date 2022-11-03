export class JWTTokenResponse {

  constructor(accessToken: String, tokenType: String) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
  }

  private accessToken: String;
  private tokenType: String;
}
