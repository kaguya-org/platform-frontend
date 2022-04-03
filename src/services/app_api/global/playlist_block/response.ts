export type Classe = {
  id: string;
  name: string;
  description: string;
  link: string;
  block_id: string;
  created_at: string;
  updated_at: string;
}

export type Block = {
  id: string;
  name: string;
  playlist_id: string;
  created_at: string;
  updated_at: string;
  classes: Classe[];
}