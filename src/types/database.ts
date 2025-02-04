
export interface Course {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  total_lectures: number;
}

export interface Module {
  id: number;
  course_id: number;
  name: string;
}

export interface Lesson {
  id: number;
  module_id: number;
  order: number;
  name: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  length_sec: number;
}
