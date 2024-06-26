import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const host="https://inotebook-api-three.vercel.app"
    const tempNotes=[]
    const [notes,setNotes]=useState(tempNotes);

    //GET ALL NOTES
    const getAllNotes=async()=>{
      const url=`${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "GET", 
        mode: "cors", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json();
      setNotes(json);
    }

    //ADD NEW NOTE
    const addNote=async(title,description,tag)=>{
      const url=`${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST", 
        mode: "cors", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const note=await response.json();
       setNotes(notes.concat(note));
    }
    

    //DELETE A NOTE
    const deleteNote=async(id)=>{
      const url=`${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE", 
        mode: "cors", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      });
      const json=await response.json();
      const newNotes=notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }



    //EDIT A NOTE
    const editNote=async(id,title,description,tag)=>{
      const url=`${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: "PUT", 
        mode: "cors", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const json=await response.json();
      let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes);
    }


    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
);
}
export default NoteState;
