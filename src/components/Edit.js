import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const { updata, setUPdata } = useContext(updatedata)

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobileNumber: "",
        work: "",
        address: "",
        description: "",
        id: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`https://backend-crud-wx8i.onrender.com/api/v1/userDetails/viewDetails/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (data.statusCode === 200 && data) {
            const mappedData = {
                name: data.result.name || '',
                email: data.result.email || '',
                age: data.result.age || '',
                mobileNumber: data.result.mobileNumber || '',
                work: data.result.work || '',
                address: data.result.address || '',
                description: data.result.description || '',
            };
            setINP(mappedData)
            console.log("get data");

        } else {
            console.log("error ");


        }
    }

    useEffect(() => {
        getdata();
    }, [id]);


    const updateuser = async (e) => {
        e.preventDefault();

        const { name, email, work, address, mobileNumber, description, age } = inpval;

        const res2 = await fetch(`https://backend-crud-wx8i.onrender.com/api/v1/userDetails/updateUserDetails`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id, name, email, work, address, mobileNumber, description, age
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (data2.statusCode=== 200 &&data2) {
            alert(data2.responseMessage)
            setUPdata(data2);
            navigate("/")
    
        } else {
            alert(data2.responseMessage);
            
        }

    }

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inpval.mobileNumber} onChange={setdata} name="mobileNumber" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.address} onChange={setdata} name="address" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="description" value={inpval.description} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;





