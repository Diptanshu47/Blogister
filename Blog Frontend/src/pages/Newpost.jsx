import { React, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

function Compose() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [name,setname] = useState('');
  const [content,setcontent] = useState('');
  const [author,setauthor] = useState('');
  const [blog,setblog] = useState({title : '',content : ''});

  const [tags,settags] = useState(['Untagged']);

  useEffect(() => {
    setblog({...blog,tags : tags});
  }, [tags]);

  const handlename = (event)=>{
    setname(event.target.value);
    setblog({...blog,title : event.target.value})
  }
  const handlecontent = (event)=>{
    setcontent(event.target.value);
    setblog({...blog,content : event.target.value})
  }
  const handleauthor = (event)=>{
    setauthor(event.target.value);
    setblog({...blog,author : event.target.value})
  }


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

  const handlesubmit = (event)=>{
      event.preventDefault();
      console.log(blog);
      console.log(tags);
      axios.post("http://localhost:1500/new",blog)
      .then(()=>{
        enqueueSnackbar('Succesfully Created a new Post',{ variant: 'success' })
        navigate("/");
      }).catch((err)=>{
          if(name.length==0||content.length==0||author.length==0){
            enqueueSnackbar('Fields Cannot Be Empty',{ variant: 'warning' })
          }else{
            enqueueSnackbar(err.message+' Cannot Create a new Post',{ variant: 'error' })
          }
      })
  }

  return (
    <div>
        <h1>Compose</h1>
        <form>
            <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  required 
                  className="form-control" 
                  type="text" 
                  placeholder="Input here" 
                  name="title" 
                  onChange={handlename}
                  value={name}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Content</label>
                <textarea 
                  required
                  className="form-control" 
                  type="text" 
                  rows="5" 
                  placeholder="Input here" 
                  name="content" 
                  onChange={handlecontent}
                  value={content}
                >
                </textarea>
            </div>

            <div className="form-group">
                <label className="form-label">Author</label>
                <input 
                  required 
                  className="form-control" 
                  type="text" 
                  placeholder="Input here" 
                  name="title" 
                  onChange={handleauthor}
                  value={author}
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
                  placeholder='Enter Your Tags Here'
                  default
                />
            </div>

            <button className="btn btn-primary" type="submit" onClick={handlesubmit} >Create</button>
        </form>
    </div>
  )
}

export default Compose