import type {Competition} from "~/models/competition.model";
import type {Image, Meta} from "~/models/strapi.model";

export interface Player {
  id: number
  slug: string
  ranking: number
  first_name: string
  last_name: string
  created_at?: Date
  updated_at?: Date
  competitions?: Competition[],
  image?: Image
}

export interface PlayerResponse {
  data: Player
}

export interface PlayersResponse {
  data: Player[]
  meta: Meta
}
