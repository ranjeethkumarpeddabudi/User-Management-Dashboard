import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>User Management Dashboard</h1>
      <Link to="/user-form">
        <button>Add User</button>
      </Link>
    </div>
  );
};

export default Header;
