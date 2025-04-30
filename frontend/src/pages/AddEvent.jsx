import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API } from '../utils/constants'
import { useAuth } from '../context/AuthContext'

const AddListing = () => {
  const { token } = useAuth()

  const itemNameRef = useRef()
  const descriptionRef = useRef()
  const categoryRef = useRef()
  const conditionRef = useRef()
  const priceRef = useRef()
  const imageRef = useRef()

  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const itemName = itemNameRef.current.value
    const description = descriptionRef.current.value
    const category = categoryRef.current.value
    const condition = conditionRef.current.value
    const price = priceRef.current.value
    const imageFile = imageRef.current.files[0]

    const formData = new FormData()
    formData.append('itemName', itemName)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('condition', condition)
    formData.append('price', price)
    formData.append('imageName', imageFile)
    formData.append('status', 'Available') 

    try {
      const res = await axios.post(`${API}/listings`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.status === 201) {
        setMessage("Listing Created Successfully")
        itemNameRef.current.value = ""
        descriptionRef.current.value = ""
        categoryRef.current.value = ""
        conditionRef.current.value = ""
        priceRef.current.value = ""
        imageRef.current.value = ""
      }
    } catch (error) {
      console.error(error)
      setMessage("Failed to create listing")
    }
  }

  return (
    <div className='row'>
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h3>Add a New Listing</h3>
            <span>{message}</span>
          </div>
          <div className="card-body">
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
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

              Product Image
              <input ref={imageRef} type='file' accept='image/*' className='form-control mb-3' required />

              <button type='submit' className='btn btn-dark w-100'>Add Listing</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddListing
