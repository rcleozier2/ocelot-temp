import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

interface Props {
  tasks: any;
  drivers: any;
}

const DriverTableView = (props: Props) => {
  const tableData: Array<object> = [];
  const drivers = props.drivers;
  const keys = Object.keys(drivers);

  const timeslots: Array<string> = [
    "slot4amTo9am",
    "slot9amTo12pm",
    "slot12pmTo3pm",
    "slot3pmTo6pm",
    "slot6pmTo9pm",
    "slot9pmTo4am"
  ];

  // Build Row Data
  keys.forEach((key: any) => {
    let obj = {
      name: drivers[key].name
    };

    let driver = drivers[key];

    timeslots.forEach(slot => {
      obj[slot + "_r"] = driver[slot].completed;
      obj[slot + "_ua"] = driver[slot].completedOntime;
      obj[slot + "_d"] = driver[slot].completedLate;
      obj[slot + "_f"] = driver[slot].failed;
    });
    tableData.push(obj);
  });

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Driver" rowSpan={4} style={{ width: "190px" }} />
        <Column
          header="4AM - 9AM"
          colSpan={4}
          style={{ backgroundColor: "#FFCA58" }}
        />
        <Column
          header="9AM-Noon"
          colSpan={4}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="Noon-3PM"
          colSpan={4}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="3PM-6PM"
          colSpan={4}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="6PM-9PM"
          colSpan={4}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="9PM-4AM"
          colSpan={4}
          style={{ backgroundColor: "#FFCA58" }}
        />
      </Row>

      <Row>
        <Column header="Done" />
        <Column header="On Time" />
        <Column header="Late" />
        <Column header="Failed" />

        <Column header="Done" />
        <Column header="On Time" />
        <Column header="Late" />
        <Column header="Failed" />

        <Column header="Done" />
        <Column header="On Time" />
        <Column header="Late" />
        <Column header="Failed" />

        <Column header="Done" />
        <Column header="On Time" />
        <Column header="Late" />
        <Column header="Failed" />

        <Column header="Done" />
        <Column header="On Time" />
        <Column header="Late" />
        <Column header="Failed" />

        <Column header="Done" />
        <Column header="On Time" />
        <Column header="Late" />
        <Column header="Failed" />
      </Row>
    </ColumnGroup>
  );

  return (
    <DataTable value={tableData} headerColumnGroup={headerGroup}>
      <Column field="name" />

      <Column field="slot4amTo9am_r" />
      <Column field="slot4amTo9am_d" />
      <Column field="slot4amTo9am_f" />
      <Column field="slot4amTo9am_ua" />

      <Column field="slot9amTo12pm_r" colSpan={2} />
      <Column field="slot9amTo12pm_d" colSpan={2} />
      <Column field="slot9amTo12pm_f" colSpan={2} />
      <Column field="slot9amTo12pm_ua" colSpan={2} />

      <Column field="slot12pmTo3pm_r" colSpan={2} />
      <Column field="slot12pmTo3pm_d" colSpan={2} />
      <Column field="slot12pmTo3pm_f" colSpan={2} />
      <Column field="slot12pmTo3pm_ua" colSpan={2} />

      <Column field="slot3pmTo6pm_r" colSpan={2} />
      <Column field="slot3pmTo6pm_d" colSpan={2} />
      <Column field="slot3pmTo6pm_f" colSpan={2} />
      <Column field="slot3pmTo6pm_ua" colSpan={2} />

      <Column field="slot6pmTo9pm_r" colSpan={2} />
      <Column field="slot6pmTo9pm_d" colSpan={2} />
      <Column field="slot6pmTo9pm_f" colSpan={2} />
      <Column field="slot6pmTo9pm_ua" colSpan={2} />

      <Column field="slot9pmTo4am_r" colSpan={2} />
      <Column field="slot9pmTo4am_d" colSpan={2} />
      <Column field="slot9pmTo4am_f" colSpan={2} />
      <Column field="slot9pmTo4am_ua" colSpan={2} />
    </DataTable>
  );
};

export default DriverTableView;
