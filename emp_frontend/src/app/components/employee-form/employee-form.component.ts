import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { EmployeeEdit } from '../../models/class/EmployeeEdit';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OCRComponent } from "../ocr/ocr.component";

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, CommonModule, OCRComponent],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employeeObj: EmployeeEdit = new EmployeeEdit();
  @Input() set employeeData(value: EmployeeEdit) {
    this.employeeObj = { ...value };
  }
  @Output() saveEmployee = new EventEmitter<EmployeeEdit>();
  @Output() resetForm = new EventEmitter<void>();

  onSave() {
    this.saveEmployee.emit(this.employeeObj);
  }

  onReset() {
    this.resetForm.emit();
  }

  
  onOCRExtracted(text: string){
  
  // Normalize text by trimming extra whitespace and handling common delimiters
  const cleanedText = text.replace(/\s+/g, ' ').trim();
  
  // Define regex patterns for each field
  const patterns = {
    name: /(?:Name:|name:)\s*(.+?)(?=\s*(Email:|Phone:|Address:|$))/i,
    email: /(?:Email:|email:)\s*([^\s]+@[^\s]+)/i,
    phone: /(?:Phone:|phone:)\s*([\d\-\+\(\)\s]+)/i,
    address: /(?:Address:|address:)\s*(.+)$/i,
  };

  // Extract and assign data to fields
  this.employeeObj.name = (cleanedText.match(patterns.name)?.[1] || '').trim();
  this.employeeObj.email = (cleanedText.match(patterns.email)?.[1] || '').trim();
  this.employeeObj.phone = (cleanedText.match(patterns.phone)?.[1] || '').trim();
  this.employeeObj.address = (cleanedText.match(patterns.address)?.[1] || '').trim();

  // Log the extracted data for debugging
  console.log('Extracted Employee Data:', this.employeeObj);
}
    
  
}