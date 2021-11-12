<template>
  <div class="login">
    <register-header />

    <div class="login-container">
      <div class="form-group">
        <label for="userName">User Name</label>
        <input
          type="text"
          v-model="user.userName"
          name="userName"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          name="password"
          class="form-control"
          required
        />
      </div>
      <div v-if="submitted" class="error-msg">{{ errorMessage }}</div>
      <div class="form-group">
        <button class="form-group-button" v-on:click.prevent="onLoginPressed()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterHeader from "@/components/RegisterHeader.vue";
import { mapState } from "vuex";
export default {
  name: "Login Page",
  components: {
    RegisterHeader,
  },
  data() {
    return {
      user: {
        userName: "",
        password: "",
      },
      submitted: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    onLoginPressed() {
      this.submitted = true;
      let userExsist;
      if (this.user.userName == "") {
        this.errorMessage = "Please enter UserName";
      } else {
        userExsist = this.$store.state.users.find(
          (item) => item.userName == this.user.userName
        );
        this.errorMessage = "";
        if (userExsist) {
          if (this.user.password == "") {
            this.errorMessage = "Please enter Password";
          } else if (userExsist.password == this.user.password) {
            userExsist.loggedIn = true;
            this.$router.push("/books");
          } else {
            this.errorMessage = "Please enter correct password";
          }
        } else {
          this.errorMessage = "User Not found";
        }
      }
    },
  },
};
</script>
 