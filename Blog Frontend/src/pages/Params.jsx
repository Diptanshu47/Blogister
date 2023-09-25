import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import ComposeButton from '../components/ComposeButton';

function Params() {
  const port = import.meta.env.VITE_Host_id 

  const {id} = useParams();
  const [content,setcontent] = useState('');
  const [error,seterr] = useState('');
  const [tags,settags] = useState([]);

  useEffect(()=>{
    axios.get(`${port}/posts/${id}`)
    .then((data)=>{
        setcontent(data.data[0]);
        settags(data.data[0].tags);
    }).catch((err)=>{
        seterr(err.message);
    })
  },[]);

  return (
    <div>
        {
        error == '' 
        ? 
        <div>
            <h1>{content.name}</h1>
            <p className='date'>{content.date}</p>
            <p className='content' >{content.content}</p>
            <div className='taged form-control'>
              {
                tags.map((a,index)=>{
                  return <p className='single-tag' key={index}><LocalOfferIcon />{a}</p>
                })
              }
            </div>
            <p className='author'>By: {content.author}</p>

            <div className="crud">
              <Link to={`/edit/${content._id}`}><button className="crud-button btn btn-primary">Edit</button></Link>
            </div>
            <div className="crud">
                <Link to={`/delete/${content._id}`}><button className="crud-button btn btn-primary">Delete</button></Link>
            </div>
        </div>
        : 
        <div className='deletestuff'>{error}</div>
        }

        <ComposeButton />
    </div>
  )
}

export default Params