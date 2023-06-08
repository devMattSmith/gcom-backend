export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface Roles {
  name:string
  type:string
  permissions:[string]
}

export interface Permission {
  module:string
  create:string
  edit:string
  delete:string
  list:string
}