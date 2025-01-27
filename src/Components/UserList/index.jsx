import { Link } from "react-router-dom";
import ContextApi from "../ContextApi";
import Header from "../Header";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

import "./index.css";

//Get the User List and Display in the User interface

const UserList = () => {
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
                        <MdDeleteForever />
                        Delete
                      </button>
                      <Link to="/user-form">
                        <button
                          className="edit-button"
                          onClick={() => onClickEdit(user)}
                        >
                          <BiEdit />
                          Edit
                        </button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        );
      }}
    </ContextApi.Consumer>
  );
};

export default UserList;
