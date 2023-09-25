import React, { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import ComposeButton from '../components/ComposeButton'
import Loading from '../components/Loading';

function Tags() {
  const port = import.meta.env.VITE_Host_id 
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [arr,setarr] = useState([]);
  const [loading,setloading] = useState(0);
  const [error,seterror] = useState('')

  useEffect(()=>{
    setloading(1)
    setTimeout(() => {
      setloading(0)
    }, 500);
  },[])


  useEffect(()=>{
    axios.get(`${port}/posts`)
    .then(async(data)=>{
      const array = [];
      data.data.map((a)=>{
        const {tags} = a;
        tags.map((val)=>{
          array.push(val)
        })
      })
      const uniqueArray = Array.from(new Set(array));
      uniqueArray.sort()
      setarr(uniqueArray)
    }).catch((err)=>{
      seterror(err.message);
      enqueueSnackbar(err.message+' Cannot Fetch Tags',{ variant: 'error' })
    })
  },[]);


  return (
    <div>
      {
      error != "" ? <h2 className='errormsg'>{error+' Cannot Fetch Tags'}</h2>
      :
      <div>
        {
        loading ?
        <Loading loading={loading} />
        :
        <div>
          <LocalOfferIcon sx={{ fontSize: 50 }}/>
          <h2>All tags from a-z :</h2>
          {
            <div>
              {arr.map((op,index)=>{
                return <button key={index} onClick={()=>{navigate(`/tags/${op}`)}} style={{margin:"5px"}}>{op}</button>
              })}
            </div>
          }
          <ComposeButton />
        </div>
        }
      </div>
      }   
    </div>
  )
}

export default Tags