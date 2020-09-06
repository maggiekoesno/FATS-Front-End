import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { UserContext } from "./src/contexts/UserContext";
import Router from "./src/Router";

export default function App() {
  const [user, setUser] = useState(null);

  const handleChangeUser = (newUser) => {
    setUser(newUser);
  };

  const initValue = {
    user: user,
    setUser: handleChangeUser,
  };

  return (
    <UserContext.Provider value={initValue}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Router />
      </ApplicationProvider>
    </UserContext.Provider>
  );
}
