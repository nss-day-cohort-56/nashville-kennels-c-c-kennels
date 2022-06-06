import React, { useEffect, useState } from "react"
import LocationRepository from "../../repositories/LocationRepository";
import Location from "./Location"
import "./LocationList.css"


export const LocationList = () => {
    const [ locations, updateLocations ] = useState([])

    useEffect(() => {
        LocationRepository.getAll()

        fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((data) => {
                updateLocations(data)
            })
    }, [])

    return (
        <div className="locations">
            {locations.map(l => <Location key={l.id} location={l} />)}
        </div>
    )
}
