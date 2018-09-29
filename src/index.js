import React from "react";
import ReactDOM from "react-dom";

import Stopwatches from "./stopwatches.js";

ReactDOM.render(
  <Stopwatches begin={100} />,
  document.getElementById("container")
);
