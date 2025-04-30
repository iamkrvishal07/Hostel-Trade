import axios from 'axios'
import { useRef, useState } from 'react'
import EventCard from '../component/EventCard'

const Search = () => {
    const searchRef = useRef()
    const url = 'http://localhost:5000/uploads/';
    const [ listings, setListings ] = useState([])
    const [error, setError ] = useState("")
    const handleSubmit = async (e) => {
        setError("")
        e.preventDefault()
        let key = searchRef.current.value
        console.log(key)
        try {
            let data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listings/search/${key}`)
            console.log(data.data);
            setListings(data.data)
        } catch (error) {
            setListings([])
            setError("No Data Found")
        }
    }

  return (
    <>
    <div className='row'>
        <div className="col-md-4 mx-auto">
            <form method="post" onSubmit={handleSubmit}>
                <div className="row g-0">
                    <div className="col-8">
                        <input ref={searchRef} className="form-control" type="text" placeholder='Search Event' required />
                    </div>
                    <div className="col-2">
                        <input type='submit' value="Search" className='btn btn-dark' />
                    </div>
                </div>
            </form>
        </div>
    </div>
    {
        error.length > 0 ? (
            <p>{error}</p>
        ) : (
            <div className='row g-2 my-3'>
            {
                listings.map( listing => (
                    <div className="col-md-4" key={listing._id}>
                        <EventCard listing={{ ...listing, imageName: url + listing.imageName }} />
                    </div>
                ))
            }
            </div>

        )
    }
</>
  )
}

export default Search