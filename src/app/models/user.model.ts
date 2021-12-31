import {Role} from "./roles.model";

export class User {
  id: number;
  email: string;
  name: string;
  role: Role

  constructor(id: number, email: string, name: string, role: Role) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role
  }
}
