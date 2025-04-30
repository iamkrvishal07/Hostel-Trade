import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {getUserFromToken} from '../utils/utilityFunction'

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [listings, setListings] = useState({});
  const [error, setError] = useState(null);

  console.log(token)

  
  const isOwner = listings?.ownerId?._id === getUserFromToken()


  const getEventDetails = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/listings/${id}`
      );
      setListings(response.data);
    } catch (error) {
      setError("An error occurred while fetching event details.");
      console.error(error);
      navigate("/");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/listings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting the listing:", error);
        alert("Failed to delete the listing. Please try again.");
      }
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [id]);

  return (
    <div className="row g-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="col-md-6">
        <img
          src={listings.imageName}
          className="img-fluid w-75 "
          alt={listings.itemName}
        />
      </div>
      <div className="col border border-dark">
        <h2>{listings.itemName}</h2>
        <p>
          <span className="fw-semibold">Description: </span>
          {listings.description}
        </p>
        <p>
          <span className="fw-semibold">Price: </span>
          {listings.price}
        </p>
        <p>
          <span className="fw-semibold">Condition: </span>
          {listings.condition}
        </p>
        <p>
          <span className="fw-semibold">Category: </span>
          {listings.category}
        </p>

        <div className="card">
          <div className="card-body">
            <p className="card-title lead fw-bold">Contact Person</p>
            <span className="d-block fw-semibold">
              {listings?.ownerId?.name}
              <br />
              {listings?.ownerId?.mobile}
              <br />
              {listings?.ownerId?.sic}
            </span>
          </div>
          {isOwner && (
            <div className="card-footer">
              <Link to={`/update/${listings._id}`} className="btn btn-info me-2">
                Update
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
              <br/>
              <button onClick={() => navigate(`/image/${listings._id}`)} className="btn btn-warning btn-info me-2 mt-2">
            Image update only
            </button>
              

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
