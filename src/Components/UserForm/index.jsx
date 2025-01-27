import { useContext, useState } from "react";
import ContextApi from "../ContextApi";
import Header from "../Header";

const UserForm = () => {
  const { activeUser, onUpdateUser, userData } = useContext(ContextApi);
  const { id, firstName, lastName, email, department } = activeUser;

  const [newUser, setNewUser] = useState({
    id: id || "",
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    department: department || "",
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const isUserExists = userData.find((user) => user.id === id);
      if (!isUserExists) {
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-type": "application/json",
          },
        });
        console.log(res);
        if (res.ok) {
          onUpdateUser(newUser);
          setNewUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            department: "",
          });
        }
      } else {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(newUser),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        console.log(res);
        if (res.ok) {
          onUpdateUser(newUser);
          setNewUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            department: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <form onSubmit={onSubmitForm}>
        <input
          placeholder="Enter Your ID"
          name="id"
          onChange={handleInput}
          value={newUser.id}
          required
        />
        <input
          placeholder="Enter Your First Name"
          name="firstName"
          onChange={handleInput}
          value={newUser.firstName}
          required
        />
        <input
          placeholder="Enter Your Last Name"
          name="lastName"
          onChange={handleInput}
          value={newUser.lastName}
          required
        />
        <input
          placeholder="@email.com"
          name="email"
          onChange={handleInput}
          value={newUser.email}
          required
        />
        <input
          placeholder="Enter Your Department"
          name="department"
          onChange={handleInput}
          value={newUser.department}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserForm;
