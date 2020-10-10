import React, { useEffect, useState } from "react";
import { TablePanel } from "./TablePanel";
import { recentSales } from "../data/tableData";
import { FileSelector } from "./FileSelector";
export const AddNewProject = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (data === {}) {
    return <FileSelector setData={setData} />;
  }
  return (
    <>
      <TablePanel title="Recent Sales"></TablePanel>
    </>
  );
};
