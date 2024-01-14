import React, { useContext, useState, useEffect, useRef } from "react";
import notecontext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { Addnotes } from "./Addnotes";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(notecontext);
  const { notes, getAllNotes, editNotes } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
      // eslint-disable-next-line
    } else {
      navigate("/Login");
    }
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refclose = useRef(null);

  const updatenote = (cNote) => {
    ref.current.click();
    setNote({
      id: cNote._id,
      etitle: cNote.title,
      edescription: cNote.description,
      etag: cNote.tag,
    });
  };

  const handleClick = (e) => {
    editNotes(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnotes />
      <button
        style={{ display: "none" }}
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex="-"
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
              <div className="my-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  rows="3"
                  value={note.edescription}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                className="btn btn-dark"
                onClick={handleClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your notes</h2>
      <div className="row">
        <div className="container text-center">
          {notes.length === 0 && "No Notes available"}{" "}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem note={note} updatenote={updatenote} key={note._id} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
