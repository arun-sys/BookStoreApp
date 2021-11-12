<template lang="">
 <dashboard-header/>
    <div class="orders-page-container">
      <div class="orders-page-header">
        <div class="orders-total-text">
          Total Orders ({{getCurrentLoggedUser == "Admin" ? getTotalOrders :filterSelectedBookOrders.length}})
        </div>
         <div class="orders-select-book"> 
         <select v-model="selectedBook" class="orders-select-book-option">
            <option value="" disabled >Select a Book</option>
          <option v-for="option in getBooksNameList" v-bind:key="option">
            {{ option}}
          </option>
        </select>
        </div>
      </div>

        <div class="orders-page-table-container">
         <table class="orders-page-table">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Buyer Email</th>
                    <th>Book Name</th>
                    <th>Quantity</th>
                    <th>Order Date/Time</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in filterSelectedBookOrders" :key="order.orderId">
                    <td>{{order.orderId}}</td>
                    <td>{{order.email}}</td>
                    <td>{{order.bookName}}</td>
                    <td>{{order.quantity}}</td>
                    <td>{{order.date}}</td>
                    <td>{{order.amount}}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
import DashboardHeader from "@/components/DashboardHeader.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedBook: "",
      orders: this.$store.state.orders,
      currentUser:this.$store.getters.getCurrentLoggedUser,
    };
  },
  components: {
    DashboardHeader,
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["getTotalOrders", "getBooksNameList"]),
    filterSelectedBookOrders() {
      if(this.$store.getters.getCurrentLoggedUser == "Admin" && this.selectedBook == ""){
           return this.$store.state.orders;
      }
      else if(this.selectedBook == ""){
            return this.$store.state.orders.filter((item) => item.email == this.$store.getters.getCurrentLoggedUserMail);
      }
      else {
           return this.$store.state.orders.filter((item) => item.bookName == this.selectedBook);
      }
     
    },
  },
};
</script>