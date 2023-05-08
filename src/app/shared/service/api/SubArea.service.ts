import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PageDTO } from '../../model/response/PageDTO';
import { SubAreaDTO } from '../../model/response/SubAreaDTO';
import { environment } from 'src/environments/environment';
import { SubAreaDTORequest } from '../../model/request/SubAreaDTORequest';

@Injectable({
  providedIn: 'root',
})
export class SubAreaService {
  private _httpClient = inject(HttpClient);

  public findByArea(
    idArea: number,
    page: number,
    size: number
  ): Observable<PageDTO<SubAreaDTO>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', 'id');
    queryParams = queryParams.append('order', '1');
    return this._httpClient.get<any>(
      environment.urlBase + `sub-areas/sub-area/filter/${idArea}?` + queryParams
    );
  }

  public save(subArea: SubAreaDTORequest): Observable<any> {
    return this._httpClient.post<any>(
      environment.urlBase + 'sub-areas/sub-area',
      subArea
    );
  }

  public upate(id: number, subArea: SubAreaDTORequest): Observable<any> {
    return this._httpClient.put<any>(
      environment.urlBase + 'sub-areas/sub-area/' + id,
      subArea
    );
  }

  public delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(
      environment.urlBase + 'sub-areas/sub-area/' + id
    );
  }
}
