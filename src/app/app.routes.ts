import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { CalendarComponent } from './calendar.component';
import { ReportsComponent } from './reports.component';
import { CreateTaskComponent } from './create-task.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirect root to tasks
    { path: 'tasks', component: TasksComponent },
    { path: 'create-task', component: CreateTaskComponent },
    { path: 'create-task/:id', component: CreateTaskComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'reports', component: ReportsComponent },
    { path: '**', redirectTo: '' } // Wildcard route for handling 404 errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
