import { Link } from "react-router-dom";
import ContextApi from "../ContextApi";
import Header from "../Header";
import { useState } from "react";
import "./index.css";

//Get the User List and Display in the User interface

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
            <section>
              <ul>
                {userData.map((user) => (
                  <li key={user.id}>
                    <p>
                      First Name: <span>{user.firstName}</span>
                    </p>
                    <p>
                      Last Name: <span>{user.lastName}</span>
                    </p>
                    <p>
                      Email: <span>{user.email}</span>
                    </p>
                    <p>
                      Department: <span>{user.department}</span>
                    </p>
                    <div className="button-container">
                      <button
                        className="delete-button"
                        onClick={() => onClickDelete(user.id)}
                      >
                        Delete
                      </button>
                      <Link to="/user-form">
                        <button
                          className="edit-button"
                          onClick={() => onClickEdit(user)}
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" className="left-button">
                left
              </button>
              <p>{current}</p>
              <button type="button" className="right-button">
                Right
              </button>
            </section>
          </>
        );
      }}
    </ContextApi.Consumer>
  );
};

export default UserList;
