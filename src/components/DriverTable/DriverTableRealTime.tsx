import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Assigned, Scheduled, Complete } from "../Icon/TableIcons";
import cleanName from "../../helpers/clean-name";

interface Props {
  tasks: any;
  drivers: any;
}

const DriverTableRealTime = (props: Props) => {
  const tableData: Array<object> = [];
  const drivers = props.drivers;
  const keys = Object.keys(drivers);

  const assigned = "Sche..";
  const failed = "Assig..";
  const justSend = "Done";

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
      obj[slot + "_1"] = <Assigned data={driver[slot]} />;
      obj[slot + "_2"] = <Scheduled data={driver[slot]} />;
      obj[slot + "_3"] = <Complete data={driver[slot]} />;
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
        <Column header={assigned} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={assigned} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={assigned} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={assigned} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={assigned} />
        <Column header={failed} />
        <Column header={justSend} />

        <Column header={assigned} />
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

      >
        <Column field="name" style={{ width: "140px" }} />

        <Column field="slot4amTo9am_1" />
        <Column field="slot4amTo9am_2" />
        <Column field="slot4amTo9am_3" />

        <Column field="slot9amTo12pm_1" />
        <Column field="slot9amTo12pm_2" />
        <Column field="slot9amTo12pm_3" />

        <Column field="slot12pmTo3pm_1" />
        <Column field="slot12pmTo3pm_2" />
        <Column field="slot12pmTo3pm_3" />

        <Column field="slot3pmTo6pm_1" />
        <Column field="slot3pmTo6pm_2" />
        <Column field="slot3pmTo6pm_3" />

        <Column field="slot6pmTo9pm_1" />
        <Column field="slot6pmTo9pm_2" />
        <Column field="slot6pmTo9pm_3" />

        <Column field="slot9pmTo4am_1" />
        <Column field="slot9pmTo4am_2" />
        <Column field="slot9pmTo4am_3" />
      </DataTable>
    </>
  );
};

export default DriverTableRealTime;
