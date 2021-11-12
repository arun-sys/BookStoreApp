<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="dashboard-header-text">
        {{ getCurrentLoggedUser }} Dashboard
      </div>
      <div
        class="dashboard-header-logout-button"
        v-on:click="onLogOutPressed(getCurrentLoggedUser)"
      >
        Log out
      </div>
    </div>
    <div class="dashboard-routing">
      <div class="dashboard-routing-child">
        <router-link to="/books">{{
          getCurrentLoggedUser == "Admin" ? "Inventory" : "Books"
        }}</router-link>
      </div>
      <div class="dashboard-routing-child">
        <router-link to="/orders">Orders</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard Header Page",
  components: {},
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["getCurrentLoggedUser"]),
  },
  methods: {
    onLogOutPressed(userName) {
      console.log("onLogOutPressed", userName);
      console.log("onLogOutPressed",  this.$store.state.users);
      this.$store.state.users.forEach((item) => {
         console.log("onLogOutPressed",  item);
        if (item.fullName == userName) {
         return item.loggedIn = false;
        }
      });
      this.$router.push("/login");
    },
  },
};
</script>
