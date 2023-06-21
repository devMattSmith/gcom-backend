export interface ChapterProgress {
  _id?: String;
  chapter_id: String;
  completed: Number;
}
export interface ModuleProgress {
  _id?: String;
  reply: String;
  chapter_progress: String;
}

export interface CrourseProgress {
  _id?: String;
  userId: String;
  courseId: String;
  module_progress: [ModuleProgress];
}
