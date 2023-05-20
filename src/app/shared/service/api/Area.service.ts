import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AreaDTORequest } from '../../model/request/AreaDTORequest';
import { PageDTO } from '../../model/response/PageDTO';
import { AreaDTO } from '../../model/response/AreaDTO';
@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private _httpClient = inject(HttpClient);

  public findByDescription(
    description: string,
    page: number,
    size: number
  ): Observable<PageDTO<AreaDTO>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('description', description);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', 'id');
    queryParams = queryParams.append('order', '1');
    return this._httpClient.get<any>(
      environment.urlBase + 'areas/area?' + queryParams
    );
  }

  public save(area: AreaDTORequest): Observable<any> {
    return this._httpClient.post<any>(environment.urlBase + 'areas/area', area);
  }

  public upate(id: number, area: AreaDTORequest): Observable<any> {
    return this._httpClient.put<any>(
      environment.urlBase + 'areas/area/' + id,
      area
    );
  }

  public findById(id: number): Observable<AreaDTO> {
    return this._httpClient.get<any>(environment.urlBase + 'areas/area/' + id);
  }

  public findByDescriptionFilter(description: string): Observable<AreaDTO[]> {
    return this._httpClient.get<AreaDTO[]>(
      environment.urlBase + `areas/area/filter?description=${description}`
    );
  }

  public delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(
      environment.urlBase + 'areas/area/' + id
    );
  }
}
