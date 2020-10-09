import React from "react";
import { TablePanel } from "./TablePanel";
import { recentSales } from "../data/tableData";
import { FileSelector } from "./FileSelector";
export const SalesTable = () => {
  return (
    <>
      <TablePanel title="Recent Sales">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Description</th>
              <th>Value</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.client}</td>
                <td>{sale.description}</td>
                <td>${sale.value}</td>
                <td>{sale.itemCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TablePanel>
      <FileSelector />
    </>
  );
};
