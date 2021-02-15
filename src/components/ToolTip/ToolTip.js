
import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipItem = props => {
  const { item, id } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <Tooltip
        placement={item.placement}
        isOpen={tooltipOpen}
        target={"Tooltip-" + id}
        toggle={toggle}
      >
        {item.text}
      </Tooltip>
    </span>
  );
};

const TooltipExampleMulti = () => {
  return (
    <>
      {[
        {
          placement: "bottom",
          text: "Clears the paths created during algorithm visulaization"
        },
        {
          placement: "bottom",
          text: "Clears the paths and walls which were created"
        },
        {
          placement: "bottom",
          text: "Dark mode toggle"
        },
        {
          placement: "bottom",
          text: "Number of nodes traversed"
        },
        {
          placement: "right",
          text: "maze generation algorithms"
        },
        {
          placement: "left",
          text: "path-finding algorithms"
        },
        {
          placement: "auto",
          text: "Github repo for this project"
        }
      ].map((tooltip, i) => {
        return <TooltipItem key={i} item={tooltip} id={i} />;
      })}
    </>
  );
};

export default TooltipExampleMulti;