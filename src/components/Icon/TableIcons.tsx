import React from "react";

interface Props {
  data: any;
}

const Assigned = (props: Props) => {
  return (
    <>
      <p>
        {props.data.assigned}
        {/* {props.data.scheduled > 0 && (
          <span style={{ color: "green" }}>({props.data.scheduled})</span>
        )} */}
      </p>
    </>
  );
};

const Scheduled = (props: Props) => {
  return (
    <>
      <p>
        {props.data.scheduled}
  
      </p>
    </>
  );
};


const Complete = (props: Props) => {
  return (
    <>
      <p>
        {props.data.completed}
        {props.data.completedLate > 0 && (
          <span style={{ color: "red" }}>({props.data.completedLate})</span>
        )}
      </p>
    </>
  );
};

const Failed = (props: Props) => {
  return (
    <>
      <p>
        {props.data.failed}
        {props.data.failedLate > 0 && (
          <span style={{ color: "red" }}>({props.data.failedLate})</span>
        )}
      </p>
    </>
  );
};

const JustSend = (props: Props) => {
  return (
    <>
      <p>{props.data.justSends}</p>
    </>
  );
};

export { Assigned, Complete, Scheduled, Failed, JustSend };
