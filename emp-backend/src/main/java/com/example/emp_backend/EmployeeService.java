package com.example.emp_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow();
    }

    public Employee updateEmployee(Long id, Employee employee) {
        Employee updatedEmployee = employeeRepository.findById(id).orElseThrow();
        updatedEmployee.setName(employee.getName());
        updatedEmployee.setEmail(employee.getEmail());
        updatedEmployee.setPhone(employee.getPhone());
        updatedEmployee.setPhone(employee.getAddress());
        return employeeRepository.save(updatedEmployee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
