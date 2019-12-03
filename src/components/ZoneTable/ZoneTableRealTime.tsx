import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Assigned, Scheduled, Complete } from "../Icon/TableIcons";

interface Tasks {
  [key: string]: any;
}

interface Props {
  tasks: any;
  drivers: any;
}

const ZoneTableRealTime = (props: Props) => {
  const tableData: Array<object> = [];
  const tasks = props.tasks;

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
  tasks.data.forEach((task: any) => {
    let obj: Tasks = {
      name: task.name
    };

    timeslots.forEach(slot => {
      obj[slot + "_1"] = <Assigned data={task[slot]} />;
      obj[slot + "_2"] = <Scheduled data={task[slot]} />;
      obj[slot + "_3"] = <Complete data={task[slot]} />;
    });
    tableData.push(obj);
  });

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Zone" rowSpan={4} style={{ width: "120px" }} />
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
    
      <DataTable value={tableData} headerColumnGroup={headerGroup}>
        <Column field="name" />

        <Column field="slot4amTo9am_1" className="scheduled" />
        <Column field="slot4amTo9am_2" className="assigned" />
        <Column field="slot4amTo9am_3" className="complete" />

        <Column field="slot9amTo12pm_1" className="scheduled" />
        <Column field="slot9amTo12pm_2" className="assigned" />
        <Column field="slot9amTo12pm_3" className="complete" />

        <Column field="slot12pmTo3pm_1" className="scheduled" />
        <Column field="slot12pmTo3pm_2" className="assigned" />
        <Column field="slot12pmTo3pm_3" className="complete" />

        <Column field="slot3pmTo6pm_1" className="scheduled" />
        <Column field="slot3pmTo6pm_2" className="assigned" />
        <Column field="slot3pmTo6pm_3" className="complete" />

        <Column field="slot6pmTo9pm_1" className="scheduled" />
        <Column field="slot6pmTo9pm_2" className="faassignediled" />
        <Column field="slot6pmTo9pm_3" className="complete" />

        <Column field="slot9pmTo4am_1" className="scheduled" />
        <Column field="slot9pmTo4am_2" className="assigned" />
        <Column field="slot9pmTo4am_3" className="complete" />
      </DataTable>
    </>
  );
};

export default ZoneTableRealTime;
