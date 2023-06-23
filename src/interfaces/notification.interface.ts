import { notificationStatus, notificationType } from "@/enum/enum"
import { IsEnum, IsMongoId, IsString } from "class-validator"

export interface INotification {
    notificationType:string,
    status:string,
    description:string,
    userId:string,
    courseId:string
}

export class NotificationDto{
    @IsString()
    @IsEnum(notificationType)
    notificationType:string

    @IsString()
    @IsEnum(notificationStatus)
    status:string

    @IsString()
    description:string

    @IsMongoId({message:'Invalid User id'})
    userId:string

    @IsMongoId({message:'Invalid Course Id'})
    courseId:string
}

export class UpdateNotification{
    @IsString()
    @IsEnum(notificationType)
    notificationType?:string

    @IsString()
    @IsEnum(notificationStatus)
    status?:string

    @IsString()
    description?:string

    @IsMongoId({message:'Invalid User id'})
    userId?:string

    @IsMongoId({message:'Invalid Course Id'})
    courseId?:string
}