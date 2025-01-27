import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";

import "./index.css";
const Header = () => {
  return (
    <div>
      <header className="header-container">
        <Link to="/">
          <img src="/User_icon.png" height={50} width={50} alt="user-icon" />
        </Link>
        <h1>User Management Dashboard</h1>

        <Link to="/user-form" className="link">
          <button type="button" className="add-button">
            <IoMdPersonAdd />
            Add
          </button>
        </Link>
      </header>
    </div>
  );
};

export default Header;
