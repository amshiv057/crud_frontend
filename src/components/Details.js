import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useNavigate } from 'react-router-dom';


const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const navigate = useNavigate();


    const getdata = async () => {

        const res = await fetch(`https://backend-crud-wx8i.onrender.com/api/v1/userDetails/viewDetails/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        // console.log(data);

        if (data.statusCode === 200 && data) {
            setUserdata(data.result)
            // console.log("get data");


        } else {
            console.log("error ");

        }
    }

    useEffect(() => {
        getdata();
    }, )

    const deleteuser = async () => {

        const res2 = await fetch(`https://backend-crud-wx8i.onrender.com/api/v1/userDetails/deleteDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (deletedata.statusCode === 200 && deletedata) {
            navigate("/")

        } else {
            console.log("error");

        }

    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>{getuserdata.name}</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span >{getuserdata.name}</span></h3>
                            <h3 className="mt-3">Age: <span >{getuserdata.age}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occuption: <span>{getuserdata.work}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5"><PhoneAndroidIcon />mobile: <span>+91 {getuserdata.mobileNumber}</span></p>
                            <p className="mt-3"><LocationOnIcon />location: <span>{getuserdata.address}</span></p>
                            <p className="mt-3">Description: <span>{getuserdata.description}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
