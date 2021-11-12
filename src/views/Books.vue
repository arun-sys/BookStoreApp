<template>
  <dashboard-header />
  <div class="books-page-container">
    <div class="books-header">
      <div class="books-header-text">Books</div>
      <input
        type="text"
        v-model="bookSearch"
        class="books-header-search"
        placeholder="Search"
        required
      />
      <div
        class="add-book-button"
        v-if="getCurrentLoggedUser == 'Admin'"
        v-on:click="AddBook()"
      >
        + Add Book
      </div>
    </div>

    <div class="books-container">
      <div class="book-not-available" v-if="getBookList.length == 0">
        Book Not Available
      </div>
      <div class="books-list" v-for="(book, index) in getBookList" :key="index">
        <div class="books-list-header">
          <img
            class="books-list-image"
            v-bind:src="require('../assets/' + book.image)"
            alt="Book"
          />
          <div class="books-list-title">
            <div class="d">Book Title</div>
            <div class="value">{{ book.title }}</div>
          </div>
          <div class="books-list-description">
            <div class="d">Descrption</div>
            <div class="value">{{ book.description }}</div>
          </div>
          <div class="books-list-author">
            <div class="">Author</div>
            <div class="value">{{ book.author }}</div>
          </div>
          <div class="books-list-price">
            <div class="">Price</div>
            <div class="value">{{ book.price }}</div>
          </div>
          <div class="books-list-available">
            {{ getCurrentLoggedUser == "Admin" ? "Available" : "Quantity" }}
          </div>
          <input
            type="text"
            v-model="book.count"
            name="Image"
            class="books-list-available-input"
            required
          />
          <div class="books-list-plus" v-on:click="increaseBook(index)">+</div>
          <div class="books-list-minus" v-on:click="decreaseBook(index)">-</div>
        </div>
        <div
          class="books-list-delete"
          v-if="getCurrentLoggedUser == 'Admin'"
          v-on:click="removeBook(index)"
        >
          <img
            class="books-list-delete-icon"
            src="../assets/remove-book-icon.svg"
            alt="X"
          />
        </div>
        <div
          class="books-list-buy"
          v-if="getCurrentLoggedUser != 'Admin'"
          v-on:click="buyBook(index)"
        >
          <img
            class="books-list-buy-icon"
            src="../assets/shopping-cart-solid.svg"
            alt="X"
          />
        </div>
      </div>
    </div>

    <AddBookModal v-show="isModalVisible" @close="closeModal"> </AddBookModal>
  </div>
</template>
<script>
import DashboardHeader from "@/components/DashboardHeader.vue";
import AddBookModal from "@/components/AddBookModal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      bookSearch: "",
      errorMessage: "",
      isModalVisible: false,
      totalBooksCount: 0,
    };
  },
  components: {
    DashboardHeader,
    AddBookModal,
  },
  computed: {
    ...mapGetters(["getCurrentLoggedUser"]),
    getBookList() {
      if (this.bookSearch == "") {
        return this.$store.state.booksList;
      } else {
        return this.$store.state.booksList.filter((item) =>
          item.title.startsWith(this.bookSearch)
        );
      }
    },
  },
  methods: {
    AddBook() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    increaseBook(index) {
      this.$store.state.booksList[index].count++;
    },
    decreaseBook(index) {
      if (this.$store.state.booksList[index].count == 1) {
        this.$store.state.booksList.splice(index, 1);
      } else {
        this.$store.state.booksList[index].count--;
      }
    },
    removeBook(index) {
      this.$store.state.booksList.splice(index, 1);
    },
    buyBook(index) {
      this.$store.state.orders.push({
        orderId: this.$store.state.orders.length + 1,
        email:this.$store.getters.getCurrentLoggedUserMail,
        bookName: this.$store.state.booksList[index].title,
        quantity: this.$store.state.booksList[index].count,
        date: new Date().toUTCString(),
        amount: this.$store.state.booksList[index].price * this.$store.state.booksList[index].count,
      });
    },
  },
};
</script>
