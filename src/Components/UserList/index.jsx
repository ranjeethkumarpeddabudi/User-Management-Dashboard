import { Link } from "react-router-dom";
import ContextApi from "../ContextApi";
import Header from "../Header";
import { useState } from "react";

const UserList = () => {
  const [current, setCurrent] = useState(1);
  return (
    <ContextApi.Consumer>
      {(value) => {
        const { userData, onDeleteUser, onUpdateUser } = value;
        const onClickDelete = (id) => {
          onDeleteUser(id);
        };

        const onClickEdit = (user) => {
          onUpdateUser(user);
        };

        return (
          <>
            <Header />
            <ul>
              {userData.map((user) => (
                <li key={user.id}>
                  <p>First Name: {user.firstName}</p>
                  <p>Last Name: {user.lastName}</p>
                  <p>Email: {user.email}</p>
                  <p>Department: {user.department}</p>
                  <button onClick={() => onClickDelete(user.id)}>Delete</button>
                  <Link to="/user-form">
                    <button onClick={() => onClickEdit(user)}>Edit</button>
                  </Link>
                  <hr />
                </li>
              ))}
            </ul>
            <button>left</button>
            <p>{current}</p>
            <button>Right</button>
          </>
        );
      }}
    </ContextApi.Consumer>
  );
};

export default UserList;
