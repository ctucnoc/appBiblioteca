import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PageDTO } from '../../model/response/PageDTO';
import { LibraryDTO } from '../../model/response/LibraryDTO';
import { environment } from 'src/environments/environment';
import { LibraryDTORequest } from '../../model/request/LibraryDTORequest';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private _httpClient = inject(HttpClient);

  public findByDescription(
    key_word: string,
    page: number,
    size: number
  ): Observable<PageDTO<LibraryDTO>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('key_word', key_word);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', 'id');
    queryParams = queryParams.append('order', '1');
    return this._httpClient.get<any>(
      environment.urlBase + 'libraries/library?' + queryParams
    );
  }

  public save(area: LibraryDTO): Observable<any> {
    return this._httpClient.post<any>(
      environment.urlBase + 'libraries/library',
      area
    );
  }

  public upate(id: number, library: LibraryDTORequest): Observable<any> {
    return this._httpClient.put<any>(
      environment.urlBase + 'libraries/library/' + id,
      library
    );
  }

  public findById(id: number): Observable<LibraryDTO> {
    return this._httpClient.get<any>(
      environment.urlBase + 'libraries/library/' + id
    );
  }

  public delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(
      environment.urlBase + 'libraries/library/' + id
    );
  }

  public findByDescriptionFilter(
    description: string
  ): Observable<LibraryDTO[]> {
    return this._httpClient.get<LibraryDTO[]>(
      environment.urlBase +
        `libraries/library/filter?description=${description}`
    );
  }

  public findBykeyWordFilter(key_word: string): Observable<LibraryDTO[]> {
    return this._httpClient.get<LibraryDTO[]>(
      environment.urlBase + `libraries/library/filter?key_word=${key_word}`
    );
  }
}
