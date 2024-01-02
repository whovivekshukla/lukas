import React from "react";

enum Status {
  Pending = "pending",
  InProgress = "inprogress",
  Completed = "completed",
}

const Badge = (props) => {
  return (
    <div>
      {props.status === Status.Pending && (
        <div className="badge badge-primary">Pending</div>
      )}
      {props.status === Status.InProgress && (
        <div className="badge badge-secondary">In Progress</div>
      )}
      {props.status === Status.Completed && (
        <div className="badge badge-accent">Completed</div>
      )}
    </div>
  );
};

export default Badge;
