import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  globalURL: string = 'http://localhost:3000/custom';
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get(this.globalURL);
  }
}
