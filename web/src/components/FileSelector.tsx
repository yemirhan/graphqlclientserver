import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
export function FileSelector() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Button>click to select files</Button>
      )}
    </div>
  );
}
