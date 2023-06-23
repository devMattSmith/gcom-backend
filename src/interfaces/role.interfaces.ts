export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface IPermission {
  module:string,
  create:string,
  edit:string,
  delete:string,
  list:string
}
export interface IRoles {
  name:string,
  type:string,
  permission: IPermission
}