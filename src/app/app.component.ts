import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Task } from './task';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from './task.service';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule,CommonModule], // Include RouterModule here
})
export class AppComponent {
  showWelcome = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showWelcome = this.router.url === '/';
      }
    });
  }
}
// export class AppComponent implements OnInit {
//   public tasks: Task[] = [];
//   public showWelcomeMessage = true;

//   constructor(private taskService: TaskService, private router: Router) {}

//   ngOnInit(): void {
//     this.getTasks();
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.showWelcomeMessage = event.url === '/';
//       }
//     });
//   }

//   public getTasks(): void {
//     this.taskService.getTasks().subscribe(
//       (response: Task[]) => {
//         this.tasks = response; 
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//         console.log("Error fetching tasks", error);
//       }
//     );
//   }
// }
