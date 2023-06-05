export interface Course {
  _id?: string;
  image?: String;
  status?: Boolean;
  course_name?: string;
  category_id?: number;
  watch_sample?: string;
  course_description?: string;
  uploader?: string;
  videos?: string;
  sampleVideo?: string;
  trailerVideo?: string;
  price?: number;
  viewCount?: number;
  tunmbnailImg?: string;
  language_id?: number;
  country_id?: number;
  discount_percent?: Number;
  is_disable?: Boolean;
  general_info?:GeneralInfo;
  meta?:Meta,
  module?:CourseModule
}


export interface Chapter {
  id?:string,
  name?:string,
  banner?:string,
  description?:any,
  video?:string
}

export interface CourseModule{
  id?:string,
  name?:string,
  chapter?:Chapter
}

export interface GeneralInfo {
  instructor_name?:string,
  price?:number,
  discout?:number
}

export interface Meta {
  title?:string,
  keywoards?:string,
  description?:string
}