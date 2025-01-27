import { useContext, useState } from "react";
import ContextApi from "../ContextApi";
import Header from "../Header";
import toast from "react-hot-toast";

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

  const validateForm = () => {
    if (!newUser.id.trim()) return toast.error("Id is required");
    if (!newUser.firstName.trim()) return toast.error("First name is required");
    if (!newUser.lastName.trim()) return toast.error("Last name is required");
    if (!newUser.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(newUser.email))
      return toast.error("Invalid email is required");

    if (!newUser.department.trim())
      return toast.error("Department is required");

    return true;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      try {
        const isUserExists = userData.find((user) => user.id === id);

        const response = await fetch(
          isUserExists
            ? `https://jsonplaceholder.typicode.com/users/${id}`
            : "https://jsonplaceholder.typicode.com/users",
          {
            method: isUserExists ? "PUT" : "POST",
            body: JSON.stringify(newUser),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (response.ok) {
          const fetchedData = await response.json();

          onUpdateUser(fetchedData);
          toast.success("updated");
          setNewUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            department: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
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
        />
        <input
          placeholder="Enter Your First Name"
          name="firstName"
          onChange={handleInput}
          value={newUser.firstName}
        />
        <input
          placeholder="Enter Your Last Name"
          name="lastName"
          onChange={handleInput}
          value={newUser.lastName}
        />
        <input
          placeholder="@email.com"
          name="email"
          onChange={handleInput}
          value={newUser.email}
        />
        <input
          placeholder="Enter Your Department"
          name="department"
          onChange={handleInput}
          value={newUser.department}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserForm;
