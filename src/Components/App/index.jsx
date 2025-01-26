import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "../UserList";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" Component={UserList} />
      </Routes>
    );
  }
}

export default App;
