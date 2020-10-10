import React, { useEffect, useState } from "react";
import { TablePanel } from "./TablePanel";
import { FileSelector } from "./FileSelector";
export const AddNewProject = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <TablePanel title="Recent Sales"></TablePanel>
      <FileSelector setData={setData} />
    </>
  );
};
