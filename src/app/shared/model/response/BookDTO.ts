import { EditorialDTO } from './EditorialDTO';
import { SubAreaDTO } from './SubAreaDTO';

export interface BookDTO {
  id?: number;
  title?: string;
  subtitle?: string;
  isbn?: string;
  description?: string;
  numberPage?: string;
  yearPublication?: string;
  editorial?: EditorialDTO;
  subArea?: SubAreaDTO;
}
