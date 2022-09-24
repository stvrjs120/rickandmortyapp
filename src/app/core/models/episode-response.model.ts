import { Episode } from './episode.model';
import { Info } from './info.model';

export interface EpisodeResponse {
  results: Episode[];
  info: Info;
  error: string;
}
