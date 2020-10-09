import React from "react";
import { Button } from "react-bootstrap";
import { useMeQuery } from "../generated/graphql";
import { SalesTable } from "./AddNewProject";
export default function Projects() {
  const { data, loading } = useMeQuery();

  async function clickHandler(e: any) {
    e.preventDefault();
    console.log(deneme);
  }
  if (loading) {
    console.log("loading ");
  }
  const deneme = data?.me;
  return (
    <div>
      <Button onClick={clickHandler} variant="primary">
        Primary
      </Button>{" "}
      <SalesTable />
    </div>
  );
}
