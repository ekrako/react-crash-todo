import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./componnents/Todos";
import Header from "./componnents/layout/Header";
import AddTodo from "./componnents/AddTodo";
import About from "./componnents/pages/About";
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
        id: doc.id,
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
    const updateRef = firebase
      .firestore()
      .collection("todos")
      .doc(id);
    updateRef.get().then(ref => {
      const todo = ref.data();
      updateRef.set(
        {
          // title: todo.title,
          completed: !todo.completed
        },
        { merge: true }
      );
    });
  };
  deleteItem = id => {
    firebase
      .firestore()
      .collection("todos")
      .doc(id)
      .delete();
  };
  addTodo = title => {
    const newTodo = {
      // id: uuid.v4(),
      title,
      completed: false
    };
    // Axios.post("https://jsonplaceholder.typicode.com/todos", newTodo).then(res => {
    //   this.setState({ todos: [...this.state.todos, res.data] });
    // });
    firebase
      .firestore()
      .collection("todos")
      .add(newTodo);
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
