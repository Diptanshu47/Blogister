import { React, useState , useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from "axios";

import CloseIcon from '@mui/icons-material/Close';


function Edit() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {id} = useParams();
  const [error,seterror] = useState('');
  const [obj,setobj] = useState({name : '',content : ''})
  const [tags,settags] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:1500/posts/${id}`)
    .then((data)=>{
      setobj(data.data[0]);
      settags(data.data[0].tags)
    }).catch((err)=>{
      seterror(err.message);
      enqueueSnackbar(err.message+' Cannot Fetch the Post',{ variant: 'error' })
    })
  },[]);

  useEffect(()=>{
    setobj({...obj,tags : tags});
    console.log(tags);
  },[tags]);


  const handleTags =  event => {
    if (event.key === "Enter" && event.target.value !== "" && tags.length < 5) {
        event.preventDefault(); 
        settags([...tags, event.target.value]);
        event.target.value = "";
    }
    else if (event.key === "Backspace" && tags.length && event.target.value == 0){
        const tagsCopy = [...tags];
        tagsCopy.pop();
        event.preventDefault();
        settags(tagsCopy);
    }
    else if(tags.length < 1 && event.key === "Backspace"){
        enqueueSnackbar("Since there is no tags you can't able to delete any tags",{ variant: 'error' })
    }
    else if(tags.length >= 5){
        enqueueSnackbar("You can't add more tags",{ variant: 'error' })
    }
    else if(event.target.value == "" && event.key === "Enter"){
        enqueueSnackbar("The tag should be one character long!",{ variant: 'error' })
    }
  };
  //Remove tags by clicking the cross sign
  const removeTags = index => {
      settags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };


  function handleedit(){
    console.log(tags);
    axios.patch(`http://localhost:1500/edit/posts/${id}`,obj)
    .then(()=>{
      enqueueSnackbar('Succesfully Edited the Post',{ variant: 'success' })
      navigate("/");
    }).catch((err)=>{
      enqueueSnackbar(err.message+' Cannot Edit the Post',{ variant: 'error' })
    })
  }

  return (
    <div>
        <h1>Edit</h1>
        <form>
            <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  required 
                  className="form-control" 
                  type="text" 
                  name="title" 
                  value={error != '' ? '.......Error Cannot Fetch Data' : obj.name}
                  onChange={(e)=>{
                    setobj({...obj,name : e.target.value});
                  }}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Content</label>
                <textarea 
                  required
                  className="form-control" 
                  type="text" 
                  rows="5" 
                  name="content" 
                  value={error != '' ? '.......Error Cannot Fetch Data' : obj.content}
                  onChange={(e)=>{
                    setobj({...obj,content : e.target.value})
                  }}
                >
                </textarea>
            </div>

            <div className="form-group">
                <label className="form-label">Author</label>
                <input 
                  required 
                  className="form-control" 
                  type="text" 
                  name="title" 
                  value={error != '' ? '.......Error Cannot Fetch Data' : obj.author}
                  onChange={(e)=>{
                    setobj({...obj,author : e.target.value})
                  }}
                />
            </div>

            <div className="tags">
              {tags.map((tag, index) => (
                  <div className="single-tag" key={index}>
                      <span>{tag}</span>
                      <i onClick={() => removeTags(index)}>
                          <CloseIcon />
                      </i>
                  </div>
              ))}
            </div>

            <div className="form-group intags">
                <label className="form-label">Tags</label>
                <textarea 
                  required 
                  className="form-control" 
                  type="text"  
                  name="tags" 
                  onKeyDown={event => handleTags(event)}
                  default
                />
            </div>
            <button className="btn btn-primary" type="button" onClick={handleedit}>Change</button>
        </form>
    </div>
  )
}

export default Edit