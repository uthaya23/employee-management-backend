import express from 'express';
import { Employee } from '../models/EmployeeModel.js'; // Ensure this path is correct
import { verifyAdmin } from './auth.js';
const router = express.Router();

router.post('/add', verifyAdmin, async (req, res) => {
    console.log("added")
    const { Employee_id, Employee_name, Employee_age, EmployeeJobRole, Employee_mobileNo, Employee_email } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ Employee_id });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        const newEmployee = new Employee({
            Employee_id,
            Employee_name,
            Employee_age,
            EmployeeJobRole,
            Employee_mobileNo,
            Employee_email,
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Server error while adding employee' });
    }
});

router.get('/total', verifyAdmin, async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments({});
        res.json({ totalEmployees });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        res.status(500).json({ message: 'Server error while fetching employee count' });
    }
});


router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', verifyAdmin, async (req, res) => {
    const employeeId = req.params.id;
    const updatedData = req.body; // Data to update
  
    try {
      const updatedEmployee = await Employee.findOneAndUpdate({ Employee_id: employeeIdId }, updatedData, { new: true });
      
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Server error' });
    }
});


router.get('/:id',verifyAdmin, async (req, res) => {
    console.log(`Fetching employee with ID: ${req.params.id}`);
    try {
        const employee = await Employee.findOne({ Employee_id: req.params.id });
        if (!employee) {
            console.log('Employee not found');
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log('Employee found:', employee);
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Error fetching employee details' });
    }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
    const employeeId = req.params.id;

    try {
        const result = await Employee.findOneAndDelete({ Employee_id: employeeId });

        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error while deleting Employee' });
    }
});


export { router as EmployeeRouter };
