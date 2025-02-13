import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeEdit } from '../models/class/EmployeeEdit';
import { environment } from '../../environments/environment';
import { Iemployee } from '../models/interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  http: HttpClient) { }

  getAllEmployee():Observable<Iemployee[]>{
    return this.http.get<Iemployee[]>(environment.API_URL)
  }
  getEmployeeById(id:number):Observable<Iemployee>{
    return this.http.get<Iemployee>(environment.API_URL+id)
  }

  createEmployee(employee: Iemployee):Observable<Iemployee>{
    return this.http.post<Iemployee>(environment.API_URL,employee)
  }

  updateEmployee(employee:Iemployee):Observable<Iemployee>{
    return this.http.put<Iemployee>(environment.API_URL,employee)
  }

  deleteEmployee(id:number):Observable<Iemployee>{
    return this.http.delete<Iemployee>(`${environment.API_URL}/`+id)
  }
}
