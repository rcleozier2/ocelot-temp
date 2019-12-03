import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Link } from "react-router-dom";

const buildLink = (taskId: string) => {
  return (
    <Link to={`view/task/${taskId}`} target="_blank">
      View
    </Link>
  );
};

const EventsTable = (props: any) => {
  const tasks = props.tasks.total;
  const tableData: any = [];
  const tableDataKeys = {
    "completedArr" : "Completed",
    "failedArr": "Failed"
  };

  // Build Row Data
  Object.keys(tableDataKeys).forEach((key: any) => {
    tasks[key].forEach((task: any) => {
      task.link = buildLink(task.taskId);
      task.status = tableDataKeys[key];
      tableData.push(task);
    });
  });

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Completed By" />
        <Column header="Status" />
        <Column header="View Details" />
      </Row>
    </ColumnGroup>
  );

  return (
      <DataTable
        value={tableData}
        headerColumnGroup={headerGroup}
        scrollable={true}
        scrollHeight="500px"
      >
        <Column field="worker" />
        <Column field="status" />
        <Column field="link" />
      </DataTable>
  );
};

export default EventsTable;
