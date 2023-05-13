import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoneDTO } from '../../model/response/ZoneDTO';
import { environment } from 'src/environments/environment';
import { PageDTO } from '../../model/response/PageDTO';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private _httpClient = inject(HttpClient);

  public findLibrary(
    idLibrary: number,
    page: number,
    size: number
  ): Observable<PageDTO<ZoneDTO>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', 'id');
    queryParams = queryParams.append('order', '1');
    return this._httpClient.get<PageDTO<ZoneDTO>>(
      environment.urlBase + `zones/zone/filter/${idLibrary}?` + queryParams
    );
  }
}
