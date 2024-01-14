import React, { useContext } from "react";
import notecontext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(notecontext);
  const { deleteNotes } = context;
  const { note } = props;
  return (
    <div className="col-md-4">
      <div className="card m-2 ">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNotes(note._id);
                }}
              ></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.updatenote(note)}} ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
