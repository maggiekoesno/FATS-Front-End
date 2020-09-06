import React, { useContext } from "react";
import { Input, Button, Card, Text } from "@ui-kitten/components";
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
        `${process.env.ENDPOINT}teacher-api/login/`,
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
    <Card>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter username"
        value={username}
        onChangeText={(nextValue) => setUsername(nextValue)}
      />
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button onPress={() => handleLogin()}>LOGIN</Button>
    </Card>
  );
}
