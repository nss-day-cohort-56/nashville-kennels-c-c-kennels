import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"
import { fetchIt } from "../../repositories/Fetch";
import Settings from "../../repositories/Settings";


export default ({ employee, setEmployees }) => {
    const [animalCount, setCount] = useState(0)
    const [employeeLocation, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver() //function, resource that gets resolved

    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        resolveResource(employee, employeeId, EmployeeRepository.get) //property, param, getter
    }, [])

    useEffect(() => {
        if (resource?.locations?.length > 0) {
            markLocation(resource.locations[0])
        }
    }, [resource])

    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>

                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for {resource?.animals?.length} animals
                            </section>
                            <section>
                                Working at {employeeLocation?.location?.name} location
                            </section>
                        </>
                        : ""
                }


                {getCurrentUser().employee
                    ? <button className="btn--fireEmployee" onClick={() => {
                        fetchIt(`${Settings.remoteURL}/users/${employee.id}`,
                            "DELETE").then(() => {
                                EmployeeRepository.getAll().then((data) => {
                                    setEmployees(data)
                                })

                            })
                    }}>Fire</button>
                    : <></>
                }

            </section>

        </article>
    )
}
