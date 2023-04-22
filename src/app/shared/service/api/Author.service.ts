import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  protected _httpCLient = inject(HttpClient);

  public findByName(
    key_word: string,
    page: number,
    size: number
  ): Observable<any> {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append('key_word', key_word);
    queryParameters = queryParameters.append('page', page);
    queryParameters = queryParameters.append('size', size);
    queryParameters = queryParameters.append('field', '');
    queryParameters = queryParameters.append('order', '');
    return this._httpCLient.get<any>(
      environment.urlBase + 'authors/author?' + queryParameters
    );
  }
}
