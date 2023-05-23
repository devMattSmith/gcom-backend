import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { HelpSupport } from "@interfaces/helpSupport.interfaces";
import { HelpSupportModel } from "@models/helpSupport.model";

@Service()
export class HelpSupportService {
  public async findAllHelpSupportRequests(
    skip: number,
    limit: number
  ): Promise<HelpSupport[]> {
    const helpSupport: HelpSupport[] = await HelpSupportModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ dt_added: -1 })
      .lean()
      .exec();

    return helpSupport;
  }

  public async countAllHelpSupportRequests(): Promise<number> {
    const helpSupport: number = await HelpSupportModel.count();
    return helpSupport;
  }

  public async findHelpSupportRequestById(
    helpSupportId: string
  ): Promise<HelpSupport> {
    const findHelpSupport: HelpSupport = await HelpSupportModel.findOne({
      _id: helpSupportId,
    });
    if (!findHelpSupport)
      throw new HttpException(409, "helpSupport doesn't exist");

    return findHelpSupport;
  }

  public async createHelpSupportRequest(
    helpSupportData: HelpSupport
  ): Promise<HelpSupport> {
    const createHelpSupportData: HelpSupport = await HelpSupportModel.create({
      ...helpSupportData,
    });

    return createHelpSupportData;
  }

  public async updateHelpSupportRequest(
    HelpSupportId: string,
    HelpSupportData: HelpSupport
  ): Promise<HelpSupport> {
    const updateHelpSupportById: HelpSupport =
      await HelpSupportModel.findByIdAndUpdate(
        HelpSupportId,
        {
          HelpSupportData,
        },
        { new: true }
      );
    if (!updateHelpSupportById)
      throw new HttpException(409, "helpSupport doesn't exist");

    return updateHelpSupportById;
  }

  public async deleteHelpSupportRequest(
    helpSupportId: string
  ): Promise<HelpSupport> {
    const deleteHelpSupportById: HelpSupport =
      await HelpSupportModel.findByIdAndDelete(helpSupportId);
    if (!deleteHelpSupportById)
      throw new HttpException(409, "helpSupport doesn't exist");

    return deleteHelpSupportById;
  }
}
