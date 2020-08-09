<template>
  <div class="login container">
    <a class="waves-effect waves-light btn " v-on:click="login">
      <i class="fab fa-google "></i> Login with Google</a
    >
    <a class="waves-effect waves-light btn grey" v-on:click="anonymousLogin">
      <i class="far fa-user "></i> Login Anonymously</a
    >
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      user_id: null,
      email: null,
      username: null
    };
  },
  methods: {
    async login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const username = result.user.email.split("@")[0];

      this.id = result.user.uid;
      this.username = username;
      this.email = result.user.email;

      db.ref(`users/${this.id}`).set({
        user_id: this.id,
        username: this.username,
        email: this.email,
        messages: []
      });

      this.$router.push({ name: "Chat", params: { username: this.username } });
    },
    async anonymousLogin() {
      const anonUser = await firebase.auth().signInAnonymously();
      this.id = anonUser.user.uid;
      this.email = "anonymous";
      this.username = "anonymous";

      db.ref(`users/${this.id}`).set({
        user_id: this.id,
        username: this.username,
        email: this.email,
        messages: []
      });

      this.$router.push({ name: "Chat", params: { username: this.username } });
    }
  }
};
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .btn {
  margin-bottom: 16px;
}
</style>
