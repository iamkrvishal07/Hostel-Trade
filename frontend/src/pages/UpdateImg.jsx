import axios from 'axios';
import React, { useState, useRef } from 'react';
import { API } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateImage = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const imageRef = useRef();
  const [message, setMessage] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const fetchImage = async () => {
    try {
      const res = await axios.get(`${API}/listings/${id}`);
      const listing = res.data;
      setExistingImage(listing.imageName);
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  React.useEffect(() => {
    fetchImage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (imageRef.current.files[0]) {
        formData.append('imageName', imageRef.current.files[0]);
      }
  
    if (!imageRef.current.files[0]) {
      setMessage("Please select an image.");
      return;
    }


    try {
      const res = await axios.put(`${API}/listings/image/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        setMessage("Image updated successfully!");
        fetchImage();
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update image.");
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h3>Update Image</h3>
            <span>{message}</span>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              Existing Image
              {existingImage && (
                <div className="mb-2">
                  <img src={existingImage} alt="Listing" className="img-fluid" />
                </div>
              )}

              <input ref={imageRef} type='file' accept='image/*' className='form-control mb-3' required />

              <button type="submit" className="btn btn-dark w-100">Update Image</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
