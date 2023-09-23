import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "axios";

import ComposeButton from './components/ComposeButton';
import ExploreIcon from '@mui/icons-material/Explore';

import Loading from './components/Loading';

function App() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [datas,setdatas] = useState([]);
  const [error,seterror] = useState("");
  const [arr,setarr] = useState([]);
  
  const [button,setbutton] = useState(0);
  const [loading,setloading] = useState(0)

  useEffect(()=>{
    setloading(1)
    setTimeout(() => {
      setloading(0)
    }, 500);
  },[])

  useEffect(()=>{
    axios.get('http://localhost:1500/posts')
    .then((data)=>{
      {button==0 && setdatas(data.data)};
      const array = [];
      data.data.map((a)=>{
        const {tags} = a;
        tags.map((val)=>{
          array.push(val)
        })
      })
      const uniqueArray = Array.from(new Set(array));
      setarr(uniqueArray)

    }).catch((err)=>{
      seterror(err.message);
      enqueueSnackbar(err.message+' Cannot Fetch Posts',{ variant: 'error' })
    })
  },[button]);


  function handlebutton(tag){
    document.getElementById(tag.target.id).style.backgroundColor = "skyblue";
    axios.get(`http://localhost:1500/posts/tags/${tag.target.name}`)
    .then((data)=>{
      {button && setdatas(data.data)}
    }).catch((err)=>{
      seterror(err.message);
      enqueueSnackbar(err.message+' Cannot Fetch Posts',{ variant: 'error' })
    })
  }

  return (
    <div>
      {error != "" && <h2>{error+' Cannot Fetch Posts'}</h2>}
      {
        loading ? 
        <Loading loading={loading}/>
        :
        <div>
          <div className='taggers'>
          <p onClick={()=>{setbutton(0)}} style={{marginRight : '6.5px',border : "none",float:'left'}}><ExploreIcon sx={{ fontSize: 50 }}/></p>
            {
              arr.slice(0, 9).map((data,index)=>{
                return (
                  <button 
                  name={data} 
                  key={index}
                  id={data}
                  style={ button ? {backgroundColor : "none"} : null} 
                  onClick={(e)=>{setbutton(1),handlebutton(e)}} 
                  >
                    {data}
                  </button>
                )
              })
            }
            <div className='tagmore'>
              <Link to={'/tags'}>...More-Tags</Link>
            </div>
            </div>
            {
              datas.map((ans)=>{
                const {_id , content , name} = ans;
                return (
                  <div className='homecontent' key={_id}>
                    <h1>{name}</h1>
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

export default App