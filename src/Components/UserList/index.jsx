import { Component } from "react";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class UserList extends Component {
  state = {
    apiState: apiConstants.initial,
    userList: [],
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
      this.setState({ userList: updatedData, apiState: apiConstants.success });
    } else {
      this.setState({ apiState: apiConstants.failure });
    }
  };

  renderUserList = () => {
    const { userList } = this.state;
    return (
      <div>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Department: {user.department}</p>
              <button onClick={() => this.onDeleteUser(user.id)}>Delete</button>
              <button onClick={() => this.onEditUser(user.id)}>Edit</button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  onDeleteUser = async (id) => {
    const { userList } = this.state;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    if (response.ok) {
      const filteredData = userList.filter((user) => {
        return user.id !== id;
      });

      this.setState({ userList: filteredData });
    }
  };

  onEditUser = () => {};

  renderFailureView = () => (
    <div>
      <h1>FailureView</h1>
    </div>
  );

  renderProgressView = () => (
    <div>
      <h1>Loading....</h1>
    </div>
  );
  renderUserDetails = () => {
    const { apiState } = this.state;
    switch (apiState) {
      case apiConstants.success:
        return this.renderUserList();
      case apiConstants.failure:
        return this.renderFailureView();
      case apiConstants.inProgress:
        return this.renderProgressView();
      default:
        break;
    }
  };
  render() {
    const { userList } = this.state;
    console.log(userList);
    return (
      <div>
        <h1>User Management Dashboard</h1>
        {this.renderUserDetails()}
      </div>
    );
  }
}

export default UserList;
