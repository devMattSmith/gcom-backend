import { FEATURES, ROLES } from "@/config";
import { CreateRoleDto, UpdateRoleDto } from "@/dtos/role.dto";
import { HttpException } from "@/exceptions/httpException";
import { RoleModel } from "@models/role.model";
import { Service } from "typedi";

@Service()
export class RoleService {
  constructor() {
    this.createRoles();
  }

  public async createRoles() {
    const modules = Object.keys(FEATURES);
    const roles = ROLES;
    roles.forEach((role) => {
      modules.forEach(async (module) => {
        await this.create({
          role,
          module,
          features: role === "ADMIN" ? FEATURES[module] : [],
        });
      });
    });
  }

  public async create(params: CreateRoleDto) {
    console.info(params);
    const role = await RoleModel.findOne({
      name: params.role,
      module: params.module,
    });
    if (role) {
      return {
        success: false,
        message: `${params.role} and ${params.module} Already Exists`,
      };
    }
    return { success: true, data: await RoleModel.create(params) };
  }

  public async getAll() {
    const role = ROLES;
    const response = await Promise.all(
      role.map((name) => {
        const _response = {};
        return new Promise(async (resolve, reject) => {
          _response[name] = await this.getByRole(name);
          resolve(_response);
        });
      })
    );

    const access_response = {};
    response.forEach((role) => {
      const key = Object.keys(role)[0];
      access_response[key] = role[key];
    });
    return access_response;
  }

  public async getByRole(role: string) {
    const _role = await this.findOne({ name: role });
    if (!_role) {
      throw new HttpException(400, "Invalid Role");
    }
    const response = {};
    const access = await RoleModel.find({ name: role });

    access.forEach((role) => {
      response[role["module"]] = role["features"];
    });

    return response;
  }

  public async findOne(filter) {
    return await RoleModel.findOne(filter);
  }

  public async RoleAuth(
    role: string,
    module_name: string,
    feature_name: string
  ) {
    const filter = {
      $and: [
        { name: role },
        { module: module_name },
        { features: feature_name },
      ],
    };
    const response = await RoleModel.findOne(filter);
    if (response) {
      return true;
    }
    return false;
  }

  async update(params: UpdateRoleDto) {
    return await RoleModel.findOneAndUpdate(
      { name: params.role, module: params.module },
      params,
      { new: true }
    );
  }
}
