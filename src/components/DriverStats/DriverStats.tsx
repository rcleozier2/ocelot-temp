import React from "react";
import { format, differenceInHours } from "date-fns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";


const DriverStats = (props: any) => {
  const drivers = props.drivers;
  const tableData: any = [];

 

  Object.keys(drivers).forEach((key: any) => {
    drivers[key].totalTime = differenceInHours(drivers[key].endShift, drivers[key].startShift) + " Hours"
    drivers[key].startShift = format(drivers[key].startShift, "MM/dd/yyyy h:mm a");
    drivers[key].endShift = format(drivers[key].endShift, "MM/dd/yyyy h:mm a");

      tableData.push(drivers[key]);    
  });



  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Driver" />
        <Column header="Started" />
        <Column header="Ended" />
        <Column header="Total Time" />
        <Column header="Completed" />
        <Column header="Failed" />
        <Column header="Total Scheduled" />
      </Row>
    </ColumnGroup>
  );

  return (
    <>
      <DataTable
        value={tableData}
        headerColumnGroup={headerGroup}
        scrollable={true}
        scrollHeight="500px"
      >
        <Column field="name" />
        <Column field="startShift" />
        <Column field="endShift" />
        <Column field="totalTime" />
        <Column field="total.completed" />
        <Column field="total.failed" />
        <Column field="total.scheduled" />
      </DataTable>
    </>
  );
};

export default DriverStats;
