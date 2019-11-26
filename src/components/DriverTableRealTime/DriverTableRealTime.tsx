import React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import Icon from "../Icon/Icon";
interface Props {
  tasks: any;
  drivers: any;
}

const cleanName = (name: string) => {
  if (!name) {
    return name;
  }

  const nameArray = name.split(" ");

  return `${nameArray[0]} ${nameArray[1]}`;
};

const DriverTableRealTime = (props: Props) => {
  const tableData: Array<object> = [];
  const drivers = props.drivers;
  const keys = Object.keys(drivers);

  const assigned = <Icon icon="pi pi-check" />;
  const scheduled = <Icon icon="pi pi-clock" />;
  const failed = <Icon icon="pi pi-calendar-times" />;
  const justsend = <Icon icon="pi pi-arrow-right" />;

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
      name: cleanName(drivers[key].name)
    };

    let driver = drivers[key];

    timeslots.forEach(slot => {
      obj[slot + "_r"] = driver[slot].assigned;
      obj[slot + "_d"] = driver[slot].scheduled;
      obj[slot + "_f"] = driver[slot].failed;
      obj[slot + "_ua"] = driver[slot].justSends;
    });
    tableData.push(obj);
  });

  const val = "<i> a sds</i>";

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
        <Column header={assigned} />
        <Column header={scheduled} />
        <Column header={failed} />
        <Column header={justsend} />

        <Column header={assigned} />
        <Column header={scheduled} />
        <Column header={failed} />
        <Column header={justsend} />

        <Column header={assigned} />
        <Column header={scheduled} />
        <Column header={failed} />
        <Column header={justsend} />

        <Column header={assigned} />
        <Column header={scheduled} />
        <Column header={failed} />
        <Column header={justsend} />

        <Column header={assigned} />
        <Column header={scheduled} />
        <Column header={failed} />
        <Column header={justsend} />

        <Column header={assigned} />
        <Column header={scheduled} />
        <Column header={failed} />
        <Column header={justsend} />
      </Row>
    </ColumnGroup>
  );

  return (
    <DataTable value={tableData} headerColumnGroup={headerGroup}>
      <Column field="name" />

      <Column field="slot4amTo9am_r" colSpan={2} />
      <Column field="slot4amTo9am_d" colSpan={2} />
      <Column field="slot4amTo9am_f" colSpan={2} />
      <Column field="slot4amTo9am_ua" colSpan={2} />

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

export default DriverTableRealTime;
