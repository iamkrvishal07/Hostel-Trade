import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ listing }) => {
    let { _id, itemName, imageName } = listing
    console.log(imageName)
  return (
    <div className="card border border-danger ">
        <img
  src={`${imageName}`}
  className="card-img-top border border-secondary"
  alt={itemName}
  style={{ height: "200px", objectFit: "cover" }}
/>
        <div className="card-body ">
            <h5 className="card-title  ">{itemName}</h5>
            <Link to={`/${_id}`} className="btn btn-success">Read More</Link>
        </div>
    </div>
  )
}

export default EventCard