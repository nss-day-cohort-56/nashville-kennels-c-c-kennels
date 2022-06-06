import React, { useState, useEffect } from "react"
import Employee from "./Employee"
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
                    emps.map(a => <Employee key={a.id} employee={a} />)
                }
            </div>
        </>
    )
}
