import { Link } from "react-router-dom";
import "./index.css";
const Header = () => {
  return (
    <div>
      <header className="header-container">
        <Link to="/">
          <img src="/User_icon.png" height={50} width={50} />
        </Link>
        <h1>User Management Dashboard</h1>

        <Link to="/user-form">
          <button type="button" className="add-button">
            Add User
          </button>
        </Link>
      </header>
    </div>
  );
};

export default Header;
