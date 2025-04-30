import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API } from '../utils/constants'

const SignUp = () => {
    const nameRef = useRef()
    const mobileRef = useRef()
    const emailRef = useRef()
    const sicRef = useRef()
    const passwordRef = useRef()

    const [message, setMessage] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        setMessage("")

        let name = nameRef.current.value
        let mobile = mobileRef.current.value
        let email = emailRef.current.value
        let sic = sicRef.current.value
        let password = passwordRef.current.value

        try {
            let res = await axios.post(`${API}/users`, {
                name, mobile, email, sic, password
            })
            if (res.status === 201) {
                setMessage("Account Created")
                nameRef.current.value = ""
                mobileRef.current.value = ""
                emailRef.current.value = ""
                sicRef.current.value = "" 
                passwordRef.current.value = ""
            }
        } catch (error) {
            console.log(error)
            setMessage("Account Not Created. Check email, mobile, or SIC and try again")
        }
    }

    return (
        <div className='row'>
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h3>Create an Account</h3>
                        <span>{message}</span>
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={handleSubmit}>
                            <input ref={nameRef} type='text' className='form-control mb-2' placeholder='Name' required />
                            <input ref={mobileRef} type='text' className='form-control mb-2' placeholder='Mobile' required />
                            <input ref={emailRef} type='email' className='form-control mb-2' placeholder='Email' required />
                            <input ref={sicRef} type='text' className='form-control mb-2' placeholder='SIC ID' required />
                            <input ref={passwordRef} type='password' className='form-control mb-2' placeholder='Password' required />
                            <input type='submit' className='btn btn-dark' value="Sign Up" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignUp