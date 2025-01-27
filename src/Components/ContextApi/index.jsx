import React from "react";

const ContextApi = React.createContext({
  userData: [],
  onDeleteUser: () => {},
  onEditUser: () => {},
  activeUser: {},
  onUpdateUser: () => {},
});
export default ContextApi;
