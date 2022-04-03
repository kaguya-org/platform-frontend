export type ListBlocksParams = {
  query?: {
    playlist_id?: string;
  }
}

export type ShowClasseParams = {
  query?: {
    name: string;
    block_id: string;
    classe_id?: string;
  }
}

export type ShowBlockParams = {
  query?: {
    block_id?: string;
  }
}