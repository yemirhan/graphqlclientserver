import React, { useEffect, useState } from "react";
import { TablePanel } from "./TablePanel";
import { FileSelector } from "./FileSelector";
import { useSendProjectMutation } from "../generated/graphql";
import { getParsedData } from "../parsedData";
export const AddNewProject = (props: any) => {
  const [data, setData] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [send] = useSendProjectMutation();
  useEffect(() => console.log(data), [data]);
  function handleSubmit(e: any) {
    e.preventDefault();
    send({
      variables: {
        projectName,
        userId: Number(localStorage.getItem("novauserid")),
        columnsData: getParsedData(),
      },
    });
    props.history.push("/user/projects");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-register" className="text-muted mb-1">
            <small>Project Name</small>
          </label>
          <input
            onChange={(e) => setProjectName(e.target.value)}
            id="email-register"
            name="ProjectName"
            className="form-control"
            type="text"
            placeholder="Proje"
            autoComplete="off"
          />
        </div>
        {data !== null ? (
          <TablePanel data={data} setData={setData}></TablePanel>
        ) : (
          <FileSelector setData={setData} />
        )}

        <button type="submit" className="mt-2 btn btn-lg btn-success btn-block">
          Upload Project
        </button>
      </form>
    </>
  );
};
