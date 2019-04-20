import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InterestService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get('/app/interests.json');
  }
}
