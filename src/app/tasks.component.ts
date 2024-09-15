import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule,RouterModule], // Make sure to import CommonModule here

})
export class TasksComponent implements OnInit {
    tasks: Task[] = []; // Type the tasks array
    constructor(private taskService: TaskService,private router: Router) {}
  
    ngOnInit(): void {
        this.taskService.getTasks().subscribe({
            next: (tasks: Task[]) => {
                console.log('Fetched tasks:', tasks);
                this.tasks = tasks;
                this.calculateDurations(); // Calculate durations after fetching tasks
            },
            error: (error) => {
                console.error('Error fetching tasks', error);
            },
            complete: () => {
                console.log('Fetch tasks complete');
            }
        });
    }
    
    calculateDurations(): void {
        this.tasks.forEach(task => {
            const startDate = new Date(task.startTime); // Ensure this is a Date object
            const endDate = new Date(task.endTime); // Ensure this is a Date object      
            const duration = this.calculateDuration(startDate, endDate);
            task.duration = duration;
        });
    }
    
    private calculateDuration(startDate: Date, endDate: Date): string {
        
        const diff = endDate.getTime() - startDate.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}min`;
      }
  
    editTask(id: string): void {
      this.router.navigate(['/edit-task', id]);
    }
  
//     deleteTask(id: string): void {
//       if (confirm('Are you sure you want to delete this task group?')) {
//         this.taskGroupService.deleteTask(id).subscribe(
//           () => {
//             this.loadTaskGroups();
//           },
//           (error) => {
//             console.error('Error deleting task group', error);
//           }
//         );
//       }
//     }
}