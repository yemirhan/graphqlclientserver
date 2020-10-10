import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <>
      <Link to="/addNewProject">
        <Button variant="primary" style={{ marginBottom: 10, marginTop: 10 }}>
          Add a new project
        </Button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}
