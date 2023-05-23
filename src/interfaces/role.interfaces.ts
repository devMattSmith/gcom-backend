export interface PermissionSchema {
  module: String;
  create: Boolean;
  edit: Boolean;
  delete: Boolean;
  list: Boolean;
}
export interface RoleSchema {
  id: string;
  name: String;
  type: Number;
  permissions: [PermissionSchema];
  delete: Boolean;
  list: Boolean;
}
