import React from "react";
import { Scene, Stack, Router, Actions } from "react-native-router-flux";
import { StyleSheet, StatusBar } from "react-native";

import CoursesPage from "./pages/CoursesPage";
import Login from "./pages/Login";

export default function RouterComponent() {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Stack
          key="auth"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene title="Log In" key="login" component={Login} initial />
        </Stack>
        <Stack
          key="main"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene title="Admin" key="admin" component={CoursesPage} initial />
        </Stack>
      </Stack>
    </Router>
  );
}

const style = StyleSheet.create({
  navBarStyle: {},
  titleStyle: {
    flexDirection: "row",
    width: 200,
  },
});
