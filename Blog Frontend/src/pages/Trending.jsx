import React, { useEffect, useState } from 'react'
import ComposeButton from '../components/ComposeButton'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";
import axios from "axios";

import Loading from '../components/Loading';

function Trending() {
  const port = import.meta.env.VITE_Host_id 

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [datas,setdatas] = useState([]);
  const [loading,setloading] = useState(0)

  useEffect(()=>{
    setloading(1)
    setTimeout(() => {
      setloading(0)
    }, 500);
  },[])

  useEffect(()=>{
    axios.get(`${port}/posts`)
    .then((data)=>{
      setdatas(data.data)
      function randomNum(min, max) { 
        var n = []; 
        for(var i=0;i<4;i++){ 
          n.push(Math.floor(Math.random() * max) + min); 
        }
        for(let i=0;i<4;i++){
          data.data.splice(n[i],1)
          // console.log(n[i]);
        }
      }
      randomNum(0,8);
      setdatas(data.data)
    }).catch((err)=>{
      enqueueSnackbar(err.message+' Cannot Fetch Trending posts',{ variant: 'error' })
    })
  },[])

  return (
    <div>
      {loading ? 
          <Loading loading={loading}/>
          :
          <div>
            <TrendingUpIcon sx={{ fontSize: 50 }}/>
            {
              datas.map((e,index)=>{
                // console.log(datas);
                return(
                  <Link  className='links' to={`/posts/${e._id}`} key={index}>{index+1}. {e.name}</Link>
                )
              })
            }
            <ComposeButton />
          </div>
        }
    </div>
  )
}

export default Trending