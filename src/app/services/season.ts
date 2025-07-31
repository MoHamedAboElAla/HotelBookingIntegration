import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISeason } from '../models/iseason';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private baseUrl = 'https://localhost:7235/api/Seasons';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ISeason[]> {
    return this.http.get<ISeason[]>(this.baseUrl);
  }

  getById(id: number): Observable<ISeason> {
    return this.http.get<ISeason>(`${this.baseUrl}/${id}`);
  }

  add(season: ISeason): Observable<ISeason> {
    return this.http.post<ISeason>(this.baseUrl, season);
  }

  update(id: number, season: ISeason): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, season);
  }

  delete(id: number): Observable<ISeason> {
    return this.http.delete<ISeason>(`${this.baseUrl}?id=${id}`);
  }

  getPagedSeasons(pageNumber: number, pageSize: number): Observable<any> {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString()
  };

  return this.http.get<any>('https://localhost:7235/api/Seasons/paged', { params });
}

}
