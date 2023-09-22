import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div className="my-5">
      <div>{`${name}, you have ${entries} entries!`}</div>
    </div>
  );
};

export default Rank;
