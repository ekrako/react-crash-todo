import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      textDecoration: this.props.todo.completed ? "line-through" : "none",
      backgroundColor: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted"
    };
  };

  render() {
    const { id, title, completed } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" checked={completed} onChange={this.props.markComplete.bind(this, id)} /> {title}{" "}
          <button style={btnStyle} onClick={this.props.deleteItem.bind(this, id)}>
            x
          </button>
        </p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};
const btnStyle = {
  backgroundColor: "red",
  borderRadius: "50%",
  color: "white",
  float: "right",
  padding: "5px 9px",
  border: "none",
  cursor: "pointer"
};

export default TodoItem;
