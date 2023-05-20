import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageDTO } from '../../model/response/PageDTO';
import { BookDTO } from '../../model/response/BookDTO';
import { environment } from 'src/environments/environment';
import { BookDTORequest } from '../../model/request/BookDTORequest';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _httpClient = inject(HttpClient);

  public findByKeyWord(
    key_word: string,
    page: number,
    size: number
  ): Observable<PageDTO<BookDTO>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('key_word', key_word);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', 'id');
    queryParams = queryParams.append('order', '1');
    return this._httpClient.get<any>(
      environment.urlBase + 'books/book?' + queryParams
    );
  }

  public save(book: BookDTORequest): Observable<any> {
    return this._httpClient.post<any>(environment.urlBase + 'books/book', book);
  }

  public update(id: number, book: BookDTORequest): Observable<any> {
    return this._httpClient.put<any>(
      environment.urlBase + 'books/book/' + id,
      book
    );
  }

  public findById(id: number): Observable<BookDTO> {
    return this._httpClient.get<any>(environment.urlBase + 'books/book/' + id);
  }

  public delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(
      environment.urlBase + 'books/book/' + id
    );
  }

  public existsByIsbn(isbn: string): Observable<boolean> {
    return this._httpClient.get<boolean>(
      environment.urlBase + 'books/book/filter?isbn=' + isbn
    );
  }
}
