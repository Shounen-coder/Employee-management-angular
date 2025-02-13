import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'employee',
        component: EmployeeComponent
    },
    {
        path:'edit',
        component:EditComponent
    }
];
