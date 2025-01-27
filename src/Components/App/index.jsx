import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";

import UserForm from "../UserForm";
import UserList from "../UserList";
import ContextApi from "../ContextApi";
import Header from "../Header";

class App extends Component {
  state = {
    userData: [],
    activeUser: {},
    isLoading: false,
  };
  componentDidMount() {
    this.getUserList();
  }

  getUserList = async () => {
    this.setState({ isLoading: true });
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
      this.setState({ userData: updatedData, isLoading: false });
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
        activeUser: newUserData,
      }));
    } else {
      this.setState((prev) => ({ userData: [...prev.userData, newUserData] }));
    }
  };
  render() {
    const { userData, activeUser, isLoading } = this.state;
    if (isLoading) {
      return (
        <>
          <Header />
          <div>
            <ThreeDots height="80" width="80" color="blue" />
          </div>
        </>
      );
    }

    return (
      <>
        <ContextApi.Provider
          value={{
            userData,
            onDeleteUser: this.onDeleteUser,
            activeUser,
            onUpdateUser: this.onUpdateUser,
          }}
        >
          <Routes>
            <Route index path="/" Component={UserList} />
            <Route path="/user-form" Component={UserForm} />
          </Routes>
        </ContextApi.Provider>
        <Toaster />
      </>
    );
  }
}

export default App;
