import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Complete, Failed, JustSend } from "../Icon/TableIcons";

import "./DriverTable.scss";

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

const DriverTable = (props: Props) => {
  const tableData: Array<object> = [];
  const drivers = props.drivers;
  const keys = Object.keys(drivers);

  const done = "Done"; //"<Icon icon="pi pi-check" />;"
  const failed = "Failed"; //<Icon icon="pi pi-calendar-times" />;
  const justSend = "Sends"; //<Icon icon="pi pi-arrow-right" />;

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
      obj[slot + "_1"] = <Complete data={driver[slot]} />;
      obj[slot + "_2"] = <Failed data={driver[slot]} />;
      obj[slot + "_3"] = <JustSend data={driver[slot]} />;
    });
    tableData.push(obj);
  });

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Driver" rowSpan={4} style={{ width: "140px" }} />
        <Column
          header="4AM - 9AM"
          colSpan={3}
          style={{ backgroundColor: "#F0E5D1" }}
        />
        <Column
          header="9AM-Noon"
          colSpan={3}
          style={{ backgroundColor: "#F4F4F4" }}
        />
        <Column
          header="Noon-3PM"
          colSpan={3}
          style={{ backgroundColor: "#F4F4F4" }}
        />
        <Column
          header="3PM-6PM"
          colSpan={3}
          style={{ backgroundColor: "#F4F4F4" }}
        />
        <Column
          header="6PM-9PM"
          colSpan={3}
          style={{ backgroundColor: "#F4F4F4" }}
        />
        <Column
          header="9PM-4AM"
          colSpan={3}
          style={{ backgroundColor: "#F0E5D1" }}
        />
      </Row>

      <Row>
        <Column header={done} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={done} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={done} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={done} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={done} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={done} />
        <Column header={failed} />
        <Column header={justSend} />
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
        <Column field="name" style={{ width: "140px" }} />

        <Column field="slot4amTo9am_1" className="complete" />
        <Column field="slot4amTo9am_2" className="failed" />
        <Column field="slot4amTo9am_3" className="send" />

        <Column field="slot9amTo12pm_1" className="complete" colSpan={2} />
        <Column field="slot9amTo12pm_2" className="failed" colSpan={2} />
        <Column field="slot9amTo12pm_3" className="send" colSpan={2} />

        <Column field="slot12pmTo3pm_1" className="complete" colSpan={2} />
        <Column field="slot12pmTo3pm_2" className="failed" colSpan={2} />
        <Column field="slot12pmTo3pm_3" className="send" colSpan={2} />

        <Column field="slot3pmTo6pm_1" className="complete" colSpan={2} />
        <Column field="slot3pmTo6pm_2" className="failed" colSpan={2} />
        <Column field="slot3pmTo6pm_3" className="send" colSpan={2} />

        <Column field="slot6pmTo9pm_1" className="complete" colSpan={2} />
        <Column field="slot6pmTo9pm_2" className="failed" colSpan={2} />
        <Column field="slot6pmTo9pm_3" className="send" colSpan={2} />

        <Column field="slot9pmTo4am_1" className="complete" colSpan={2} />
        <Column field="slot9pmTo4am_2" className="failed" colSpan={2} />
        <Column field="slot9pmTo4am_3" className="send" colSpan={2} />
      </DataTable>
    </>
  );
};

export default DriverTable;
