import React, { useContext } from "react";
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
  const context=useContext(NoteContext);
  const {deleteNote}=context;
  const {note,updateNote}=props;
  return (
    <>
    <div className="col-md-4 col-sm-6">
      <div className="card mx-3 my-2 border-2">
        <div className="d-flex justify-content-end align-items-center">
      <i className="fa-solid fa-trash m-2 " style={{color:"red"}} role="button" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success")}}></i>
      <i className="fa-regular fa-pen-to-square m-2" style={{color:"purple"}} role="button" onClick={()=>{updateNote(note); }}></i>
        </div>
        <div className="card-body pt-0">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
    </div>
      </div>
    </>
  );
};

export default NoteItem;
