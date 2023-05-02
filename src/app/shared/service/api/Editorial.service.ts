import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditorialDTORequest } from '../../model/request/EditorialDTORequest';
import { PageDTO } from '../../model/response/PageDTO';
import { EditorialDTO } from '../../model/response/EditorialDTO';

@Injectable({
  providedIn: 'root',
})
export class EditorialService {
  private _httpClient = inject(HttpClient);

  public findByName(
    name: string,
    page: number,
    size: number
  ): Observable<PageDTO<EditorialDTO>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('name', name);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', 'id');
    queryParams = queryParams.append('order', '1');
    return this._httpClient.get<any>(
      environment.urlBase + 'editorials/editorial?' + queryParams
    );
  }

  public save(editorial: EditorialDTORequest): Observable<any> {
    return this._httpClient.post<any>(
      environment.urlBase + 'editorials/editorial',
      editorial
    );
  }

  public upate(id: number, editorial: EditorialDTORequest): Observable<any> {
    return this._httpClient.put<any>(
      environment.urlBase + 'editorials/editorial/' + id,
      editorial
    );
  }

  public findById(id: number): Observable<EditorialDTO> {
    return this._httpClient.get<any>(
      environment.urlBase + 'editorials/editorial/' + id
    );
  }
}
