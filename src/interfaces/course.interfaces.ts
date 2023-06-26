export interface Chapter {
  id?: string;
  title?: string;
  banner?: string;
  description?: any;
  video?: string;
}

export interface CourseModule {
  id?: string;
  title?: string;
  description?: string;
  chapter?: Chapter;
  courseId: string;
}

export interface GeneralInfo {
  instructorName?: string;
  price?: number;
  discount?: number;
}

export interface Meta {
  title?: string;
  keywoards?: string;
  description?: string;
}
export interface Course {
  _id?: string;
  status: Boolean;
  course_name: string;
  category_id: string;
  duration: string;
  course_description: string;
  thumbnail: string;
  bannerImage: string;
  previewVideo: string;
  meta: Meta;
  generalInfo: GeneralInfo;
  tags: string;
  learningToolsText: string;
  learningToolsDoc: string;
  isDeleted: boolean;
  purchaseCount: number;
  viewCount: number;
}
