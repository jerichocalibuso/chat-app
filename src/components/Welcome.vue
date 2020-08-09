<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/auth/Login";
export default {
  name: "HelloWorld",
  data() {
    return {
      name: null,
      feedback: null
    };
  },
  components: { Login },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  max-width: 400px;
  margin-top: 100px;
}

.welcome h2 {
  font-size: 3em;
}

.welcome button {
  margin: 30px auto;
}
</style>
