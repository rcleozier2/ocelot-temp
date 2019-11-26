import React from "react";

const Complete = (props: any) => {
  return (
    <>
      <p>
        {props.data.completedOntime} - {props.data.completedLate}
      </p>
    </>
  );
};

const Failed = (props: any) => {
  return (
    <>
      <p>
        {props.data.failedOntime} - {props.data.failedLate}
      </p>
    </>
  );
};

const JustSend = (props: any) => {
  return (
    <>
      <p>{props.data.justSends}</p>
    </>
  );
};

export { Complete, Failed, JustSend };
