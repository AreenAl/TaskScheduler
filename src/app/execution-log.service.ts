import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Reports } from './reports';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ExecutionLogService {
    private apiUrl = 'http://localhost:8080/task/logs';
    constructor(private http: HttpClient) { }

    getAllLogs():Observable<Reports[]> {
        return this.http.get<Reports[]>(this.apiUrl).pipe(
          catchError(error => {
            console.error('Error fetching logs:', error);
            return throwError(() => new Error('Error fetching logs'));
          })
        );
      }
    }

