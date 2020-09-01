import React from "react";

import "./Spinner.css";

const Loading = () => {
  return (
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
