import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './task.service';
import { Task } from './task';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  templateUrl: './create-task.component.html',
  imports: [FormsModule], // Make sure to import CommonModule here
  styleUrls: ['./create-task.component.css'],
  providers: [DatePipe]  // Add DatePipe here

})
export class CreateTaskComponent implements OnInit {
  task: Task = {
    id: '', // Assuming ID is auto-generated or handled elsewhere
    startTime: '',
    endTime: '',
    duration: '',
    frequency: 1
  };  isEditing = false;


  constructor(private taskService: TaskService, private router: Router,    private route: ActivatedRoute, private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.taskService.getTaskById(id).subscribe({
          next: (response) => {
            this.task = response;
            console.log("+++++",response.startTime)
          },
          error: (error) => {
            console.error('Error fetching task', error);
          }
        });
      }
    });
  }
  onSubmit() : void{
    if (!this.task.startTime || !this.task.endTime || !this.task.frequency) {
        console.error('All fields must be filled');
        return;
      }
      const formattedTask :Task= {
        ...this.task,
        startTime: this.datePipe.transform(this.task.startTime, "yyyy-MM-dd'T'HH:mm:ss") ?? '',
        endTime: this.datePipe.transform(this.task.endTime, "yyyy-MM-dd'T'HH:mm:ss") ?? '',
    };
    
      if (this.isEditing) {
        this.taskService.updateTask(formattedTask).subscribe({
          next: (response) => {
            this.task = response;
            console.log('Response from backend:', response);
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Error updating task', error);
          }
        });
      } else {
        this.taskService.addTask(formattedTask).subscribe({
        next: (response) => {
            console.log('Task created successfully', response);
            this.router.navigate(['/tasks']);
        },
        error: (error) => {
            console.error('Error creating task', error);
        }
        });
    }
    }

}