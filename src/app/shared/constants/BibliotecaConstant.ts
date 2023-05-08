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

  //TITULOS PARA LOS MODALES
  static readonly TITLE_MODAL_QUESTION_SAVE: string =
    '¿Está seguro de crear un nuevo registro?';
  static readonly TITLE_MODAL_QUESTION_UPDATE: string =
    '¿Está seguro de actualizar el registro?';
  static readonly TITLE_MODAL_QUESTION_DELETE: string =
    '¿Está seguro de eliminar el registro?';
  static readonly TITLE_MODAL_LOADING: string = 'Cargando...';
  static readonly TITLE_MODAL_SAVE: string = 'Se Guardo Correctamente';
  static readonly TITLE_MODAL_UPDATE: string = 'Se Actualizo Correctamente';
  static readonly TITLE_MODAL_DELETE: string = 'Se Elimino Correctamente';

  // VALORES VACIOS
  static readonly VC_EMTY: string = '';
  static readonly VC_SEARCH: string = 'Buscar';
  static readonly VC_ADMIN: string = 'Administrar';

  static readonly VC_SUCCESS: string = 'success';
  static readonly VC_WARN: string = 'warning';
  static readonly VC_INFO: string = 'info';
  static readonly VC_ERROR: string = 'error';
  static readonly VC_QUESTION: string = 'question';

  // NRO DE PAGINAS
  static readonly PAGE_NRO_INITIAL: number = 0;
  static readonly PAGE_SIZE_INITIAL: number = 5;
}
