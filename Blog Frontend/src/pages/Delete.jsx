import React, { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "axios";
import Header from '../components/Header';

function Delete() {
  const port = import.meta.env.VITE_Host_id 

  const { enqueueSnackbar } = useSnackbar();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    axios.delete(`${port}/posts/${id}`)
    .then(()=>{
      enqueueSnackbar('Succesfully Deleted The Post',{ variant: 'success' })
      navigate("/");
    }).catch((err)=>{
      enqueueSnackbar(err.message+' Cannot Delete The Post',{ variant: 'error' })
      navigate(-1);
    })
  },[]);

  return (
    <div>
      <Header />
      <div className='container'>
        <h1 style={{color : 'red'}}>Deleting The Post.....</h1>
      </div>
    </div>
  )
}

export default Delete