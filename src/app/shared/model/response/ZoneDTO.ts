import { LibraryDTO } from './LibraryDTO';

export interface ZoneDTO {
  id?: number;
  description?: string;
  library?: LibraryDTO;
}
