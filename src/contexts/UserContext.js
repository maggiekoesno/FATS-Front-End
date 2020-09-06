import React from "react";

const init = {
  user: null,
  setUser: (newUser) => {},
};

export const UserContext = React.createContext(init);
