import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

interface Tasks {
  [key: string]: string;
}

interface Props {
  tasks: any;
  drivers: null | Array<string>;
}

const TableView = (props: Props) => {
  const tableData: Array<object> = [];
  const tasks = props.tasks;

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
      name : task.name 
    };
    
    timeslots.forEach(slot => {
      obj[slot + "_r"] = task[slot].completed;
      obj[slot + "_ua"] = task[slot].completedOntime;
      obj[slot + "_d"] = task[slot].completedLate;
      obj[slot + "_f"] = task[slot].failed;
    });
    tableData.push(obj);
  });

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Zone" rowSpan={4} style={{ width: "80px" }} />
        <Column
          header="4AM - 9AM (Too Early)"
          colSpan={4}
          style={{ "backgroundColor": "#FFCA58" }}
        />
        <Column
          header="9AM-Noon"
          colSpan={4}
          style={{ "backgroundColor": "#6ba3e5" }}
        />
        <Column
          header="Noon-3PM"
          colSpan={4}
          style={{ "backgroundColor": "#6ba3e5" }}
        />
        <Column
          header="3PM-6PM"
          colSpan={4}
          style={{ "backgroundColor": "#6ba3e5" }}
        />
        <Column
          header="6PM-9PM"
          colSpan={4}
          style={{ "backgroundColor": "#6ba3e5" }}
        />
        <Column
          header="9PM-4AM (Too Late)"
          colSpan={4}
          style={{ "backgroundColor": "#FFCA58" }}
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

  let footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer="Totals:" colSpan={1} />
        <Column footer="0" colSpan={4} />
        <Column footer="0" colSpan={4} />
        <Column footer="0" colSpan={4} />
        <Column footer="0" colSpan={4} />
        <Column footer="0" colSpan={4} />
        <Column footer="0" colSpan={4} />
      </Row>
    </ColumnGroup>
  );

  return (
    <DataTable
      value={tableData}
      headerColumnGroup={headerGroup}
      footerColumnGroup={footerGroup}
    >
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

export default TableView;
