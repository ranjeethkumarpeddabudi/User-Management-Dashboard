import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import UserForm from "../UserForm";
import UserList from "../UserList";
import ContextApi from "../ContextApi";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class App extends Component {
  state = {
    apiState: apiConstants.initial,
    userData: [],
    activeUser: {},
  };
  componentDidMount() {
    this.getUserList();
  }

  getUserList = async () => {
    this.setState({ apiState: apiConstants.inProgress });
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (res.ok) {
      const fetchedData = await res.json();
      const updatedData = fetchedData.map((user) => ({
        id: user.id,
        firstName: user.name,
        lastName: user.username,
        email: user.email,
        department: "IT",
      }));
      this.setState({ userData: updatedData, apiState: apiConstants.success });
    } else {
      this.setState({ apiState: apiConstants.failure });
    }
  };

  onDeleteUser = async (id) => {
    const { userData } = this.state;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const filteredData = userData.filter((user) => {
        return user.id !== id;
      });

      this.setState({ userData: filteredData });
    }
  };

  onEditUser = (User) => {
    this.setState({ activeUser: User });
  };
  onUpdateUser = (newUserData) => {
    const { userData } = this.state;
    const isUserExists = userData.find((user) => user.id === newUserData.id);

    if (isUserExists) {
      this.setState((prev) => ({
        userData: prev.userData.map((each) => {
          if (each.id === newUserData.id) {
            return { ...newUserData };
          }
          return each;
        }),
      }));
    }
  };
  render() {
    const { userData, activeUser } = this.state;
    console.log(userData);
    return (
      <ContextApi.Provider
        value={{
          userData,
          onDeleteUser: this.onDeleteUser,
          onEditUser: this.onEditUser,
          activeUser,
          onUpdateUser: this.onUpdateUser,
        }}
      >
        <Routes>
          <Route index path="/" Component={UserList} />
          <Route path="/user-form" Component={UserForm} />
        </Routes>
      </ContextApi.Provider>
    );
  }
}

export default App;
