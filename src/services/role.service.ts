import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { RoleSchema } from "@interfaces/role.interfaces";
import { RoleModel } from "@models/role.model";

@Service()
export class RoleService {
  public async findAllRoles(
    skip: number,
    limit: number
  ): Promise<RoleSchema[]> {
    const roles: any = await RoleModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ dt_added: -1 })
      .lean()
      .exec();

    return roles;
  }

  public async countAllRoles(): Promise<number> {
    const roles: number = await RoleModel.count();
    return roles;
  }

  public async findRoleById(helpSupportId: string): Promise<RoleSchema> {
    const findRole: RoleSchema = await RoleModel.findOne({
      _id: helpSupportId,
    });
    if (!findRole) throw new HttpException(409, "role doesn't exist");

    return findRole;
  }

  public async createRole(roleData: RoleSchema): Promise<RoleSchema> {
    const createRoleData: RoleSchema = await RoleModel.create({
      ...roleData,
    });

    return createRoleData;
  }

  public async updateRole(
    RoleId: string,
    RoleData: RoleSchema
  ): Promise<RoleSchema> {
    const updateRoleById: RoleSchema = await RoleModel.findByIdAndUpdate(
      RoleId,
      {
        RoleData,
      },
      { new: true }
    );
    if (!updateRoleById) throw new HttpException(409, "role doesn't exist");

    return updateRoleById;
  }

  public async deleteRole(roleId: string): Promise<RoleSchema> {
    const deleteRoleById: RoleSchema = await RoleModel.findByIdAndDelete(
      roleId
    );
    if (!deleteRoleById) throw new HttpException(409, "role doesn't exist");

    return deleteRoleById;
  }
}
