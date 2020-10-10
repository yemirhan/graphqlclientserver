import React from "react";
import { setParsedData } from "../parsedData";
export function TablePanel(props: any) {
  const arr = props.data.map((col: any, index: any) => [
    props.data[index]["key"],
    props.data[index]["value"],
  ]);
  const parsed = arr.map(function (x: any) {
    return {
      key: x[0],
      value: x[1],
    };
  });
  setParsedData(parsed);
  var i = 0;
  return (
    <div className="col-sm-12 tablePanel">
      <div className="card dashboardRow">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>

          <table className="table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((line: any) => (
                <tr key={i++}>
                  <td>{line[0]}</td>
                  <td>{line[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
