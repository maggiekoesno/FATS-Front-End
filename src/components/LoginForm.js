import React, { useContext } from "react";
import { StyleSheet, Dimensions } from "react-native";
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
        `${process.env.ENDPOINT}/teacher-api/login/`,
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
    <Card disabled={true}>
      <Input
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter username"
        value={username}
        onChangeText={(nextValue) => setUsername(nextValue)}
      />
      <Input
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button style={styles.button} onPress={() => handleLogin()}>
        LOGIN
      </Button>
    </Card>
  );
}

var { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    width: 0.7 * width,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 0.7 * width,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
