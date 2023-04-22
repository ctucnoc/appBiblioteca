import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditorialService {
  private _httpClient = inject(HttpClient);

  public findByName(name: string, page: number, size: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('name', name);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', size);
    queryParams = queryParams.append('field', '');
    queryParams = queryParams.append('order', '');
    return this._httpClient.get<any>(
      environment.urlBase + 'editorials/editorial?' + queryParams
    );
  }
}
