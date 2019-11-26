import React from "react";

const Icon = (props: any) => {
  return <li className={props.icon} > {props.children}</li>;
};

export default Icon;
