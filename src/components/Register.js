import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const {  setUdata } = useContext(adddata);
    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobileNumber: "",
        work: "",
        address: "",
        description: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, address, mobileNumber, description, age } = inpval;

        try {
            const res = await fetch("https://backend-crud-wx8i.onrender.com/api/v1/userDetails/createUserDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, work, address, mobileNumber, description, age
                })
            });

            const data = await res.json();

            if (data.status === 200 && data) {


                setUdata(data);
                alert("Data added successfully");
                // Navigate after setting the context
                setINP({
                    name: "",
                    email: "",
                    age: "",
                    mobileNumber: "",
                    work: "",
                    address: "",
                    description: ""
                });
                navigate("/");
                // console.log("Data added successfully");
            } else {
                // console.log("Error:", data.error);
                alert(`${data.responseMessage}`);
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4" onSubmit={addinpdata}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="number" value={inpval.mobileNumber} onChange={setdata} name="mobileNumber" className="form-control" id="exampleInputPassword1" placeholder='Enter 10 digit' />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" value={inpval.address} onChange={setdata} name="address" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name="description" value={inpval.description} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>

    )
}
export default Register;
