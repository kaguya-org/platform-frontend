export type LessonState = 'liked' | 'disliked' | 'none';

export type Lesson = {
	id: string;
	name: string;
	slug: string;
	description: string;
	link: string;
	block_id: string;
	created_at: Date;
	updated_at: Date;
	_count: {
		dislikes: number;
		likes: number;
		views: number;	
	};
	state: LessonState;
	completed: boolean;
}

export type Block = {
  id: string;
  name: string;
  slug: string;
  playlist_id: string;
  created_at: string;
  updated_at: string;
  lessons: Lesson[];
}