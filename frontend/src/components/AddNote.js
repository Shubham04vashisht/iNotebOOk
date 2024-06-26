import React, { useState,useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const AddNote = ({showAlert}) => {
    
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleOnClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        showAlert("Note Added Successfully","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='mx-auto px-3 mt-3 mb-5'>
        <h2>ADD A NOTE</h2><hr></hr>
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                value={note.title}
                name='title'
                type="text"
                className="form-control border-3"
                id="title"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label ">
                Description
              </label>
              <input
              value={note.description}
                name='description'
                type="title"
                className="form-control border-3"
                id="description"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
              value={note.tag}
                name='tag'
                type="text"
                className="form-control border-3"
                id="tag"
                onChange={onChange}
              />
            </div>
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary mt-2"
             onClick={handleOnClick} 
             >
              Add Note
            </button>
          </form>
    </div>
    </div>
  )
}

export default AddNote
