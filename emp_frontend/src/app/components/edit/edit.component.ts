import { EmployeeService } from '../../services/employee.service';
import { Component, inject, OnInit } from '@angular/core';
import { EmployeeEdit } from '../../models/class/EmployeeEdit';
import { FormsModule } from '@angular/forms';
import { Iemployee } from '../../models/interface/employee';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { UpperCasePipe } from '@angular/common';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, EmployeeFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  selectedEmployee: EmployeeEdit = new EmployeeEdit();
  employeeList: Iemployee[] = [];

  employeeService = inject(EmployeeService);


  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getAllEmployee().subscribe((res: Iemployee[]) => {
      this.employeeList = res;
    });
  }
  onSaveEmployee(employee:EmployeeEdit) {
    if (employee.id === 0) {
      this.employeeService
        .createEmployee(employee)
        .subscribe((res: Iemployee) => {
          if (res) {
            alert('Employee created successfully');
            this.loadEmployee();
            this.selectedEmployee = new EmployeeEdit();
          } else {
            alert('Error:' + errorContext);
          }
        });
    } else {
      this.employeeService
        .createEmployee(employee)
        .subscribe((res: Iemployee) => {
          if (res) {
            alert('Employee updated successfully');
            this.loadEmployee();
            this.selectedEmployee = new EmployeeEdit();
          } else {
            alert('Error:' + errorContext);
          }
        });
    }
  }

  onDelete(id: number) {
    const deleted = confirm('are you sure:');
    if (deleted) {
      //if(res) --> doubt
      this.employeeService.deleteEmployee(id).subscribe((res) => {
        alert('Employee deleted successfully');
        this.loadEmployee();
      });
    }
  }

  onEdit(item: EmployeeEdit) {
    this.selectedEmployee = {...item};
  }

  onReset(){
    this.selectedEmployee = new EmployeeEdit(); 
  }
}
