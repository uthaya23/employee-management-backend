import mongoose from "mongoose"
const employeeSchema = new mongoose.Schema(
    {
        Employee_id:{
            type:String,
            required:true,
            unique:true
        },
         Employee_name:{
            type:String,
            required:true,
         },
         Employee_age:{
            type:Number,
            required:true,
         },
         EmployeeJobRole:{
            type:String,
            required:true,},
         Employee_mobileNo:{
            type:Number,
            required:true,},
        Employee_email:{
            type:String,
            required:true,},
         }
)
const employeeModel=mongoose.model('Student',employeeSchema)
export {employeeModel as Employee}