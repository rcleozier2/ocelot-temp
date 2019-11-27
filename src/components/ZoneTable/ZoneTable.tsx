import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Complete, Failed, JustSend } from "../Icon/TableIcons";

interface Tasks {
  [key: string]: any;
}

interface Props {
  tasks: any;
  drivers: any;
}

const ZoneTableView = (props: Props) => {
  const tableData: Array<object> = [];
  const tasks = props.tasks;

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
  tasks.data.forEach((task: any) => {
    let obj: Tasks = {
      name: task.name
    };

    timeslots.forEach(slot => {
      obj[slot + "_1"] = <Complete data={task[slot]} />;
      obj[slot + "_2"] = <Failed data={task[slot]} />;
      obj[slot + "_3"] = <JustSend data={task[slot]} />;
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
          style={{ backgroundColor: "#FFCA58" }}
        />
        <Column
          header="9AM-Noon"
          colSpan={3}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="Noon-3PM"
          colSpan={3}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="3PM-6PM"
          colSpan={3}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="6PM-9PM"
          colSpan={3}
          style={{ backgroundColor: "#6ba3e5" }}
        />
        <Column
          header="9PM-4AM"
          colSpan={3}
          style={{ backgroundColor: "#FFCA58" }}
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
      <h3> Zone Data</h3>
      <DataTable value={tableData} headerColumnGroup={headerGroup}>
        <Column field="name" />

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

export default ZoneTableView;
