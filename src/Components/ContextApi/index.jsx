import React from "react";

const ContextApi = React.createContext({
  userData: [],
  onDeleteUser: () => {},
  activeUser: {},
  onUpdateUser: () => {},
});
export default ContextApi;
