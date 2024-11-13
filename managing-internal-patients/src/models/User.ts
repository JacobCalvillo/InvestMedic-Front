
export class User {
    Id?: number;
    username: string;
    phone: string;
    email: string;
    password: string;

    constructor(username: string, email: string, phone: string, password: string) {
      this.username = username;
      this.phone = phone;
      this.email = email;
      this.password = password;
    }
}
  