// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueChatScroll from "vue-chat-scroll";
import firebase from "firebase";

let app = null;

// onAuthStateChanged will be called if there are any login or logouts
// this will wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: "#app",
      router,
      components: { App },
      template: "<App/>"
    });
  }
});

Vue.use(VueChatScroll);

Vue.config.productionTip = false;
