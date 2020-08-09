<template>
  <div class="chat container">
    <h2 class="center teal-text">Chat App</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" v-bind:key="message.id">
            <span class="teal-text">{{ message.username }}</span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }} </span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :username="username" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "@/components/NewMessage";
import db from "@/firebase/init";
import firebase from "firebase";
import moment from "moment";

export default {
  name: "Chat",
  props: ["username"],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: []
    };
  },

  created() {
    const messageRef = db.ref("messages").orderByChild("timestamp");
    // Listens for any changes in db and pushes it in messages
    messageRef.on("child_added", snapshot => {
      const doc = snapshot.val();
      this.messages.push({
        id: doc.id,
        username: doc.username,
        content: doc.content,
        timestamp: moment(doc.timestamp).format("lll")
      });
    });
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.4em;
}

.chat .time {
  display: block;
  font-size: 0.6em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}

.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>
