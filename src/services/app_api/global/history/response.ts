
export type ShowHistoryResponse = {
  id: string,
	lesson: {
		name: string
	},
	playlist: {
		name: string
	},
	trail: {
		avatar: string | null,
		avatar_url: string | null
	},
	redirect: string,
	auto_generated: boolean
};
