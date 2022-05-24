export type ListBlocksParams = {
  query?: {
    playlist_id?: string;
  }
}

export type ShowLessonParams = {
  query?: {
    name: string;
    block_id: string;
    lesson_id?: string;
  }
}

export type ShowBlockParams = {
  query?: {
    block_id?: string;
  }
}