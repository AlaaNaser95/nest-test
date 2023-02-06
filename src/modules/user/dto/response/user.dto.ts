import * as moment from "moment";


export class UserDto {
  readonly id: number;
  readonly fullName: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly createdAt: string;
  accessToken?: string;


  constructor(user, token?: string) {
    this.id = user.id;
    this.fullName = user.getFullName();
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.accessToken = token;
    this.createdAt = moment(user.createdAt).format("YYYY-MMM-DD HH:mm");
  }

  setAccessToken(token) {
    this.accessToken = token;
  }
}
