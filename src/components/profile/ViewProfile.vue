<template>
  <div class="view-profile container">
    <div class="card">
      <h3 class="teal-text center">
        {{ profile.username }}
      </h3>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null
    };
  },

  async created() {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.child(this.$route.params.id).once("value");
    if (snapshot) {
      this.profile = snapshot.val();
    } else {
      this.profile = {};
    }
  }
};
</script>
