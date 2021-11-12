<template>
  <div class="register">
    <register-header />
    <div class="register-container">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          v-model="user.firstName"
          name="firstName"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          v-model="user.lastName"
          name="lastName"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Email Id</label>
        <input
          type="text"
          v-model="user.email"
          name="email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="user.userName"
          name="username"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          name="password"
          class="form-control"
        />
      </div>
      <div v-if="submitted" class="error-msg">{{ errorMessage }}</div>
      <div class="form-group">
        <button class="form-group-button" v-on:click="onRegisterPressed()">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterHeader from "@/components/RegisterHeader.vue";
export default {
  name: "Login Page",
  components: {
    RegisterHeader,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email:"",
        userName: "",
        password: "",
      },
      submitted: false,
      errorMessage: "",
    };
  },
  methods: {
    onRegisterPressed() {
      this.submitted = true;
      this.errorMessage = "";

      if (this.user.firstName == "") {
        this.errorMessage = "Please enter firstName";
      } else if (this.user.lastName == "") {
        this.errorMessage = "Please enter lastName";
      } else if (this.user.userName == "") {
        this.errorMessage = "Please enter userName";
      }else if (this.user.email == "") {
        this.errorMessage = "Please enter Email Id";
      } else if (this.user.password == "") {
        this.errorMessage = "Please enter password";
      } else if (this.user.password.length <=8) {
        this.errorMessage = "Please enter password minimum 8 characters";
      }else {
        let newUser = this.$store.state.users.find(
          (users) => users.userName == this.user.userName
        );
          this.errorMessage = "";
        if (!newUser) {
          this.$store.state.users.push({
            id: this.$store.state.users.length + 1,
            fullName: this.user.firstName + " " + this.user.lastName,
            email:this.user.email,
            userName: this.user.userName,
            password: this.user.password,
            loggedIn: false,
          });
          this.$router.push("/login");
        } else {
          this.errorMessage = "User Name already Exsists";
        }
      }
    },
  },
};
</script>   