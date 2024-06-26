import { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = ({showAlert}) => {
  let navigate=useNavigate();
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refClose=useRef(null);
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    showAlert("Note Updated Successfully","success")
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}


  return (
    <div>
    <AddNote showAlert={showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                name='etitle'
                type="text"
                className="form-control"
                value={note.etitle}
                id="etitle"
                aria-describedby="emailHelp"
                onChange={onChange}
                minLength={5} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                name='edescription'
                type="text"
                value={note.edescription}
                className="form-control"
                id="edescription"
                onChange={onChange}
                minLength={5} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                name='etag'
                type="text"
                value={note.etag}
                className="form-control"
                id="etag"
                onChange={onChange}
              />
            </div>
          </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                >
                Close
              </button>
              <button
              disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-auto px-3 mt-5 mb-5">
      <h2 className="mb-3 p-0">YOUR NOTES</h2><hr></hr>
        <div className="m-2">

        {notes.length===0 && 'OOPS! NO NOTES TO DISPLAY'}
        </ div>
        {notes.map((note) => {
          return <NoteItem showAlert={showAlert} key={note._id} note={note}updateNote={updateNote} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
