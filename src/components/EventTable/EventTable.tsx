import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import "./EventsTable.scss";

const EventsTable = (props: any) => {
    const tableData = [];
    
    const headerGroup = (
        <ColumnGroup>
          <Row>
            <Column header="Driver" rowSpan={2} />
            <Column
              header="Status"
              colSpan={1}
            />
            <Column
              header="View Details"
              colSpan={1}
            />
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
        
    </DataTable>
    )
};


export default EventsTable;
