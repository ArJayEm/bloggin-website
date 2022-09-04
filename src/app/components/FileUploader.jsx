import React, { useRef } from "react";

export default function FileUploader({
  //onFileSelect,
  onFileSelectError,
  onFileSelectSuccess,
  accept,
}) {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    //onFileSelect(e.target.files[0]);
    const file = e.target.files[0];
    //if (file.size > 1024)
    //onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    //else
    onFileSelectSuccess(e, file);
  };

  return (
    <>
      <div className="file-uploader">
        <button
          onClick={(e) => fileInput.current && fileInput.current.click()}
          className="form-control"
        >
          <input type="file" accept={accept} onChange={handleFileInput} />
        </button>
      </div>
      {/* <div className={"form-group grid-" + (isMobile ? "12" : "4")}>
      <input
        type="file"
        name=""
        accept="image/*"
        id=""
        className="form-control"
        placeholder="Thumbnail"
        //value={file}
        onChange={(e) => setFile(e.target.files[0])}
        disabled={eventSaving}
      />
    </div> */}
    </>
  );
}
