import React, { useContext } from "react";
import { Input, Button } from "@ui-kitten/components";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Actions } from "react-native-router-flux";

export default function LoginForm() {
  const userContext = useContext(UserContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = async () => {

    try {
      const data = {
        username,
        password,
      };
      let response = await axios.post(
        "http://10.0.1.6:8000/teacher-api/login/",
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
      Actions.main();
    } catch (e) {
      console.log(e);
    }
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
