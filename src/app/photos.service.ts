import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '563492ad6f917000010000019ec734fa89f0419482d235630e9dae52'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  getData(search: string, perPage: number): Observable<any> {
    const url = "https://api.pexels.com/v1/search?query="+search+"&per_page="+perPage;
    console.log(search);
    console.log(perPage);
    return this.http.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  getGalleryData(): Observable<any> {
    const url = "https://api.pexels.com/v1/search?query=IceCream&per_page=12";
    return this.http.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }


  handleError(error: any) {
    return throwError(error.message || 'Server error');
  }
}
