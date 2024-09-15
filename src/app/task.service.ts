import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Task } from './task';

@Injectable({providedIn: 'root'})
export class TaskService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient){}

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}/task/all`);
  }
  
  public getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiServerUrl}/task/find/${id}`);
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiServerUrl}/task/add`, task);
  }

  public updateTask(task: Task): Observable<Task> {
    console.log("Payload being sent to backend:",task);
    return this.http.put<Task>(`${this.apiServerUrl}/task/update`, task);
  }

  public deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/task/delete/${taskId}`);
  }
  public getTasksByDate(date: Date): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}/tasks?date=${date.toISOString()}`);
  }
}