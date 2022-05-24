import { ShowLessonResponse } from "../types";

export type Lesson = {
  id: string;
  name: string;
  slug: string;
  description: string;
  link: string;
  block_id: string;
  created_at: string;
  updated_at: string;
}

export type Block = {
  id: string;
  name: string;
  slug: string;
  playlist_id: string;
  created_at: string;
  updated_at: string;
  lessons: ShowLessonResponse[];
}