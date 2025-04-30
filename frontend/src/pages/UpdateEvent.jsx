import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { API } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEvent = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const itemNameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const conditionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  const [message, setMessage] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const fetchListing = async () => {
    try {
      const res = await axios.get(`${API}/listings/${id}`);
      const listing = res.data;
      itemNameRef.current.value = listing.itemName;
      descriptionRef.current.value = listing.description;
      categoryRef.current.value = listing.category;
      conditionRef.current.value = listing.condition;
      priceRef.current.value = listing.price;
      setExistingImage(listing.imageName);
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemNameRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('category', categoryRef.current.value);
    formData.append('condition', conditionRef.current.value);
    formData.append('price', priceRef.current.value);

    if (imageRef.current.files[0]) {
      formData.append('imageName', imageRef.current.files[0]);
    }

    try {
      const res = await axios.put(`${API}/listings/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (res.status === 200) {
        setMessage("Listing updated successfully");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update listing");
    }
  };

  return (
    <div className='row'>
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h3>Update Listing</h3>
            <span>{message}</span>
          </div>
          <div className="card-body">
            <form method="post" onSubmit={handleSubmit}>
              Item Name
              <input ref={itemNameRef} type='text' className='form-control mb-2' required />

              Description
              <textarea ref={descriptionRef} rows={4} className='form-control mb-2' required></textarea>

              Category
              <select ref={categoryRef} className='form-control mb-2' required>
                <option value="">--Select Category--</option>
                <option>Book</option>
                <option>Engineering Equipment</option>
                <option>Stationery</option>
                <option>Electronics</option>
                <option>Sports Equipment</option>
                <option>Clothing</option>
                <option>Other</option>
              </select>

              Condition
              <select ref={conditionRef} className='form-control mb-2' required>
                <option value="">--Select Condition--</option>
                <option>As New</option>
                <option>Good</option>
                <option>Poor</option>
              </select>

              Price
              <input ref={priceRef} type='number' className='form-control mb-2' required />

              Existing Image
              {existingImage && (
                <div className='mb-2'>
                  <img src={existingImage} alt='Listing' className='img-fluid' />
                </div>
              )}

              <input ref={imageRef} type='file' accept='image/*' className='form-control mb-3' />

              <button type='submit' className='btn btn-dark w-100'>Update Listing</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
