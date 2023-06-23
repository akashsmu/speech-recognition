import { purple } from "@material-ui/core/colors";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
import React from "react";
import Split from "react-split";

function Choice() {
  return (
    <Split
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vh",
      }}
      sizes={[60, 60]}
      minSize={10}
      expandToMin={false}
      gutterSize={0}
      gutterAlign="center"
      snapOffset={0}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
    >
      <div style={{ backgroundColor: "purple" }}>1</div>
      <div style={{ backgroundColor: "red", textAlign: "center" }}>2</div>
    </Split>
  );
}

export default Choice;
