<template>
 <div id="nav">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App Page",
  created(){
    this.$router.push("/login");
    // console.log('created', this.$router)

  },
};
</script>