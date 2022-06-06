import React, { useState, useEffect } from "react" //useState is a property, useEffect is a property
import Employee from "./Employee" //assign function to variable Employee (reference to a function)
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"


export const EmployeeList = () => {
    const [emps, setEmployees] = useState([])

    useEffect(
        () => {
            EmployeeRepository.getAll()

            fetch(`http://localhost:8088/users?employee=true`)
            .then(response => response.json())
            .then((data) => {
                setEmployees(data)
            })
            
        }, []
    )

    return (
        <>
            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} setEmployees={setEmployees}/>)
                }
            </div>
        </>
    )
}
