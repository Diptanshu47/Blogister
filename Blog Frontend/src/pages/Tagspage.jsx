import React, { useState , useEffect } from 'react'
import axios from "axios";
import ComposeButton from '../components/ComposeButton'
import { useNavigate, useParams,Link } from "react-router-dom";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useSnackbar } from 'notistack';
import Loading from '../components/Loading';

function Tagspage() {

  const {id} = useParams();
  const [datas,setdatas] = useState([]);
  const [loading,setloading] = useState(0)

  useEffect(()=>{
    setloading(1)
    setTimeout(() => {
      setloading(0)
    }, 500);
  },[])

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(()=>{
    axios.get(`http://localhost:1500/posts/tags/${id}`)
    .then((data)=>{
      setdatas(data.data)
      console.log(data.data);
    }).catch((err)=>{
      enqueueSnackbar(err.message+' Cannot Fetch Posts',{ variant: 'error' })
    })
  },[]);


  return (
   <div>
      {
        loading ?
        <Loading loading={loading}/>
        :
        <div>
          <h1><LocalOfferIcon style={{fontSize : "25px"}}/>{id} :</h1>
          {
            datas.map((ans)=>{
            const {_id , content , name , author ,date ,tags} = ans;
            return (
              <div className='homecontent' key={_id}>
              <h3>{name}</h3>
              <p>
                  {content.substring(0, 100)}
                  ...
                  <Link to={`/posts/${_id}`} >Read-More</Link>
              </p>
              </div>
              )
            })
           }
          <ComposeButton />
        </div>
      }
   </div>
  )
}

export default Tagspage