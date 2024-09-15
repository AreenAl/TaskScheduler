import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarMonthViewDay, DateAdapter } from 'angular-calendar';
import { TaskService } from './task.service';
import { Observable } from 'rxjs'
import { startOfDay, endOfDay, isSameDay, addMonths, subMonths } from 'date-fns'; // Import date functions
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls:['./calendar.component.css'],
  standalone:true,
  imports:[CommonModule,]
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedTask: CalendarEvent | null = null; // Track the currently selected task

  constructor(private http: HttpClient, private modalService: NgbModal){}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get<CalendarEvent[]>('http://localhost:8080/task/all').subscribe(data => {
      this.events = data;
    });
  }

  dayClicked(day: CalendarMonthViewDay): void {
    alert(`Start Date: ${day.date}`);
  }

  prevMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }
  openTaskDetails(task: CalendarEvent, taskModal: any): void {
    this.selectedTask = task; // Set the selected task
    this.modalService.open(taskModal, { size: 'lg' }); // Open the modal
  }
}