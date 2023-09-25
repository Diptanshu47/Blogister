import React, { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "axios";

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
    <div>Deleted</div>
  )
}

export default Delete