import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import cleanName from "../../helpers/clean-name";

const DriverStatsRealTime = (props: any) => {
  const drivers = props.drivers;
  const tableData: any = [];

  Object.keys(drivers).forEach((key: any) => {
    drivers[key].name = cleanName(drivers[key].name);
    tableData.push(drivers[key]);
  });

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Driver" />
        <Column header="Completed" />
        <Column header="Failed" />
        <Column header="Total Scheduled" />
      </Row>
    </ColumnGroup>
  );

  return (
    <>
      <DataTable value={tableData} headerColumnGroup={headerGroup}>
        <Column field="name" />
        <Column field="total.completed" />
        <Column field="total.failed" />
        <Column field="total.scheduled" />
      </DataTable>
    </>
  );
};

export default DriverStatsRealTime;
