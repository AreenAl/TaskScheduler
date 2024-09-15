import { Component, OnInit } from '@angular/core';
import { Reports } from './reports';  // Adjust the import path as needed
import { CommonModule } from '@angular/common';
import { ExecutionLogService } from './execution-log.service';

@Component({
  selector: 'app-report',
  standalone:true,
  templateUrl: './reports.component.html',
  imports: [CommonModule],
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
    logs: Reports[] = [];
    constructor(private logService: ExecutionLogService) {}

  ngOnInit(): void {
    this.logService.getAllLogs().subscribe(
        (logs: Reports[]) => {
          this.logs = logs;
        },
        error => {
          console.error('Error fetching logs:', error);
        }
      );
    }
  }
