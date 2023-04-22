import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AreaDTORequest } from '../../model/request/AreaDTORequest';
@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private _httpClient = inject(HttpClient);

  public findByDescription(
    description: string,
    page: number,
    size: number
  ): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('description', description);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', '');
    queryParams = queryParams.append('order', '');
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

  public findById(id: number): Observable<any> {
    return this._httpClient.get<any>(environment.urlBase + 'areas/area/' + id);
  }
}
