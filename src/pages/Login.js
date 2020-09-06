import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Layout style={styles.container}>
      <LoginForm />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
