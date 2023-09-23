import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "axios";

function Delete() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    axios.delete(`http://localhost:1500/posts/${id}`)
    .then(()=>{
      enqueueSnackbar('Succesfully Deleted The Post',{ variant: 'success' })
      navigate("/");
    }).catch((err)=>{
      enqueueSnackbar(err.message+' Cannot Delete The Post',{ variant: 'error' })
      navigate(-1);
    })
  },[]);

  return (
    <div></div>
  )
}

export default Delete