/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import Chat from "@/components/Chat";
import ViewProfile from "@/components/profile/ViewProfile";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history", //gets rid of .../# instead use history
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile/:id",
      name: "ViewProfile",
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Router guard
router.beforeEach((to, from, next) => {
  // check if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // if user is signed in
      next();
    } else {
      next({ name: "Welcome" });
    }
  } else {
    next();
  }

  if (!to.matched.length) {
    next("/404NotFound");
  } else {
    next();
  }
});

export default router;
