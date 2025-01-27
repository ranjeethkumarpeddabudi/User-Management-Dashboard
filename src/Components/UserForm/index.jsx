import { useContext, useState } from "react";
import ContextApi from "../ContextApi";
import Header from "../Header";
import toast from "react-hot-toast";
import "./index.css";
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
    console.log(newUser);
    console.log(newUser.id);
    if (!String(newUser.id).trim()) return toast.error("Id is required");
    if (!newUser.firstName.trim()) return toast.error("First name is required");
    if (!newUser.lastName.trim()) return toast.error("Last name is required");
    if (!newUser.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(newUser.email))
      return toast.error("Invalid email format");

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
      <section>
        <form onSubmit={onSubmitForm} className="form-container">
          <h2>Please Enter User Details</h2>
          <label htmlFor="userid">Id</label>
          <input
            placeholder="Enter Your ID"
            name="id"
            id="userid"
            onChange={handleInput}
            value={newUser.id}
            autoFocus
          />
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter Your First Name"
            name="firstName"
            onChange={handleInput}
            value={newUser.firstName}
          />
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter Your Last Name"
            name="lastName"
            onChange={handleInput}
            value={newUser.lastName}
          />
          <label htmlFor="email">Email</label>
          <input
            placeholder="abc@email.com"
            name="email"
            id="email"
            onChange={handleInput}
            value={newUser.email}
          />
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            placeholder="Enter Your Department"
            name="department"
            onChange={handleInput}
            value={newUser.department}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default UserForm;
