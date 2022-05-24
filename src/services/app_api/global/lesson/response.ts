
export type ShowLessonResponse = {
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
	}
};
