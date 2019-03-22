import React from "react";

const Project = props => {
  const { name, description, completed } = props.project;
  return (
    <>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{completed ? "Completed" : "Not Completed"}</p>
    </>
  );
};

export default Project;
