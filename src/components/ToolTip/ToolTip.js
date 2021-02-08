
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

const TooltipExampleMulti = props => {
  return (
    <>
      {[
        {
          placement: "bottom",
          text: "clearPathToolTip"
        },
        {
          placement: "bottom",
          text: "clearGridToolTip"
        }
      ].map((tooltip, i) => {
        return <TooltipItem key={i} item={tooltip} id={i} />;
      })}
    </>
  );
};

export default TooltipExampleMulti;