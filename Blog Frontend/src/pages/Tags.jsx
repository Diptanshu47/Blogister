import React, { useState , useEffect } from 'react'
import axios from "axios";
import ComposeButton from '../components/ComposeButton'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import Loading from '../components/Loading';

function Tags() {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [arr,setarr] = useState([]);
  const [loading,setloading] = useState(0)

  useEffect(()=>{
    setloading(1)
    setTimeout(() => {
      setloading(0)
    }, 500);
  },[])


  useEffect(()=>{
    axios.get('http://localhost:1500/posts')
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
      enqueueSnackbar(err.message+' Cannot Fetch Posts',{ variant: 'error' })
    })
  },[]);


  return (
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
  )
}

export default Tags