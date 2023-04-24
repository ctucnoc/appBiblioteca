export abstract class BibliotecaConstant {
  // OPERACIÓN A REALIZAR
  static readonly ACTION_ADD: string = 'add';
  static readonly ACTION_UPDATE: string = 'update';

  //TITULOS DE LAS PAGINAS
  static readonly TITLE_PAGE_AREA: string = 'Area';
  static readonly TITLE_PAGE_EDITORIAL: string = 'Editorial';
  static readonly TITLE_PAGE_AUTHOR: string = 'Autor';
  static readonly TITLE_PAGE_SUB_AREA: string = 'Sub_Area';
  static readonly TITLE_PAGE_BOOK_CATALOG: string = 'Catalogo de libros';
  static readonly TITLE_PAGE_BOOK: string = 'Libro';

  // VALORES VACIOS
  static readonly VC_EMTY: string = '';
  static readonly VC_SEARCH: string = 'Buscar';
  static readonly VC_ADMIN: string = 'Administrar';

  // NRO DE PAGINAS
  static readonly PAGE_NRO_INITIAL: number = 0;
  static readonly PAGE_SIZE_INITIAL: number = 5;
}
