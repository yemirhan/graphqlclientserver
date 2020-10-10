import React from "react";
import { Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useUserProjectsQuery } from "../generated/graphql";

interface Props {}
export function Projects(props: any) {
  let match = useRouteMatch();
  const { data, loading, error } = useUserProjectsQuery({
    fetchPolicy: "network-only",
    variables: { userId: Number(localStorage.getItem("novauserid")) },
  });
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }
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
        <tbody>
          {data?.projectsOfUser?.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>
                <Link to={`${match.url}/projects/:${project.id}`}>
                  {project.projectName}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </>
  );
}
