import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, submit }) => { 
  return (
    <div className="flex-center flex-column">
      <p>
        {"This magic brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="input-block flex-center">
        <input onChange={onInputChange} type="text" />
        <button onClick={submit} className="detect-btn ">
          Detect
        </button>
      </div>
    </div>
  );
}

export default ImageLinkForm;