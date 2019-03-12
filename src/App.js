import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./componnents/Todos";
import Header from "./componnents/layout/Header";
import AddTodo from "./componnents/AddTodo";
// import uuid from "uuid";
import About from "./componnents/pages/About";
import Axios from "axios";
import firebase from "./Firestore";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("todos");
    this.state = {
      todos: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const todos = [];
    querySnapshot.forEach(doc => {
      const { title, completed } = doc.data();
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        completed
      });
    });
    this.setState({
      todos
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  markComplete = id => {
    // console.log(this.state.todos);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          Axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, todo);
        }
        return todo;
      })
    });
  };
  deleteItem = id => {
    // console.log(this.state.todos);
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => {
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      });
    });
  };
  addTodo = title => {
    const newTodo = {
      // id: uuid.v4(),
      title,
      completed: false
    };
    Axios.post("https://jsonplaceholder.typicode.com/todos", newTodo).then(res => {
      this.setState({ todos: [...this.state.todos, res.data] });
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} deleteItem={this.deleteItem} />{" "}
                </React.Fragment>
              )}
            />
            <Route path="/about" render={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
