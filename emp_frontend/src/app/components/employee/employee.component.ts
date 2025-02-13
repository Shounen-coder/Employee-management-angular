import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iemployee } from '../../models/interface/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeList: Iemployee[] = []
  http = inject(HttpClient)


  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.http.get<Iemployee[]>("http://localhost:8080/api/employees").subscribe((res:Iemployee[])=>{
      this.employeeList = res
    })
  }
}
