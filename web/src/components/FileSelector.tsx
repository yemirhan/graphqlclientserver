import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import xlsxParser from "xlsx-parse-json";
export function FileSelector(props: any) {
  const onDrop = useCallback((acceptedFiles) => {
    xlsxParser.onFileSelection(acceptedFiles[0]).then((data: any) => {
      props.setData({ ...data }["Sheet1"]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Button>click to select file</Button>
      )}
    </div>
  );
}
