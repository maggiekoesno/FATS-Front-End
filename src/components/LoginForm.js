import React, { useContext } from "react";
import { Input, Button } from "@ui-kitten/components";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Actions } from "react-native-router-flux";

// function getCookie(response) {
//   return response.headers["set-cookie"][0].split(";")[0].split("csrftoken=")[1];
// }

export default function LoginForm() {
  const userContext = useContext(UserContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = async () => {
    // const response = await axios.get("http://127.0.0.1:8000/api-auth/login/");
    // console.log(response);
    try {
      const data = {
        username,
        password,
      };
      let response = await axios.post(
        "http://10.0.1.7:8000/teacher-api/login/",
        data
      );

      const user = {
        userId: response.data.user_id,
        email: response.data.email,
      };
      userContext.setUser(user);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (e) {
      console.log(e);
    }

    Actions.main();
  };

  return (
    <React.Fragment>
      <Input
        placeholder="Enter username"
        value={username}
        onChangeText={(nextValue) => setUsername(nextValue)}
      />
      <Input
        placeholder="Enter password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button onPress={() => handleLogin()}>LOGIN</Button>
    </React.Fragment>
  );
}
