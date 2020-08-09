<template>
  <div class="new-message">
    <form v-on:submit.prevent="addMessage">
      <label for="new-message">New Messsage (enter to add): </label>
      <input type="text" name="new-message" v-model="newMessage" />
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "NewMessage",
  props: ["username"],
  data() {
    return {
      newMessage: null,
      feedback: null,
      user_id: null
    };
  },

  mounted() {
    this.user_id = firebase.auth().currentUser.uid;
  },

  methods: {
    addMessage() {
      if (this.newMessage) {
        const message = {
          content: this.newMessage,
          username: this.username,
          timestamp: Date.now()
        };

        db.ref("messages")
          .push(message)
          .catch(err => {
            console.log(err);
          });

        db.ref(`users/${this.user_id}/messages`).push(message);

        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    }
  }
};
</script>
