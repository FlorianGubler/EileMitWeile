export class User {
  constructor(id : String, email: String, firstname: String, lastname: String, password: String) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
  }

  public id: String;
  public email: String;
  public firstname: String;
  public lastname: String;
  public password: String;
}
