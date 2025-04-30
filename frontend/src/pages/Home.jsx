import { useState, useEffect } from 'react'
import axios from 'axios'
import EventCard from '../component/EventCard.jsx'

const Home = () => {
    console.log(import.meta.env.VITE_BACKEND_URL)
    const [ listings, setListings ] = useState([])
    const url = '';
    const getListings = async() => {
        try {
            let data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listings`)
            console.log(data.data);
            setListings(data.data);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getListings()
    }, [])
  return (
    <div className='row g-2'>
        {

            listings.map( (listing) => (
                <div className="col-md-4" key={listing._id}>
                    <EventCard listing={{ ...listing, imageName: url + listing.imageName }} />
                </div>
            ))
        }
    </div>
  )
}

export default Home