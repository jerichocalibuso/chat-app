<template>
  <div class="navbar">
    <nav class="teal">
      <div class="container">
        <router-link :to="{ name: 'Chat' }"
          ><a href class="brand-logo left">Chat App</a></router-link
        >

        <ul class="right">
          <li v-if="user">
            <router-link :to="{ name: 'Chat' }">Chat</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Welcome' }">Login</router-link>
          </li>

          <li v-if="user">
            <router-link
              :to="{ name: 'ViewProfile', params: { id: user_id } }"
              >{{ this.username }}</router-link
            >
          </li>
          <li v-if="user">
            <a href v-on:click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      username: null,
      user_id: null
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Welcome" });
    },
    async logout() {
      await firebase.auth().signOut();
      this.$router.push({ name: "Welcome" });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.user_id = user.uid;
        if (!user.isAnonymous) {
          this.username = user.email.split("@")[0];
        }
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style></style>
