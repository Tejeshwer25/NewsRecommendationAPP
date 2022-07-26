import React from "react";

function Heading({ tag, heading }) {
  return (
    <>
      {tag === "1" ? <h1>{heading}</h1> : <></>}
      {tag === "2" ? <h2>{heading}</h2> : <></>}
      {tag === "3" ? <h3>{heading}</h3> : <></>}
      {tag === "4" ? <h4>{heading}</h4> : <></>}
      {tag === "5" ? <h5>{heading}</h5> : <></>}
      {tag === "6" ? <h6>{heading}</h6> : <></>}
    </>
  );
}

export default Heading;
