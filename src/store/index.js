import { createStore } from 'vuex'

export default createStore({
  state: {
    title: "welcome to book store",
    users: [
      { id: 1, fullName: 'Admin', email: "admin@gmail.com", userName: 'admin', password: 'admin', loggedIn: false },
      { id: 2, fullName: 'Arun', email: "arun@gmail.com", userName: 'arun', password: 'arun', loggedIn: false },],

    booksList: [
      { author: "Jhon", title: "Tom", description: "Tom story", price: 1000, image: "book-solid.svg", count: 1 },
      { author: "Karthick", title: 'Apple', description: 'About fruit', price: 2000, image: 'book-reader-solid.svg', count: 1 },
      { author: "Kiran", title: 'About Jungle', description: 'forest life', price: 3000, image: 'book-solid.svg', count: 1 },
      { author: "Arun", title: 'Home Tour', description: 'village life', price: 1000, image: 'book-reader-solid.svg', count: 1 },],

    orders: [
      { orderId: 1, email: "aruncse@gmail.com", bookName: "Tom", date: new Date().toUTCString(), quantity: 3, amount: 3000 },
      { orderId: 2, email: "arun@gmail.com", bookName: "Apple", date: new Date().toUTCString(), quantity: 1, amount: 2000 },
      { orderId: 3, email: "aruncs@gmail.com", bookName: "About Jungle", date: new Date().toUTCString(), quantity: 2, amount: 6000 },
      { orderId: 4, email: "aruncs@gmail.com", bookName: "Home Tour", date: new Date().toUTCString(), quantity: 2, amount: 2000 }],
  },
  mutations: {

  },
  actions: {

  },
  modules: {
  },

  getters: {
    getCurrentLoggedUser: state => {
      if (state.users.filter((user) => user.loggedIn == true).length != 0) {
        return state.users.filter((user) => user.loggedIn == true)[0].fullName;
      }

    },
    getCurrentLoggedUserMail: state => {
      if (state.users.filter((user) => user.loggedIn == true).length != 0) {
        return state.users.filter((user) => user.loggedIn == true)[0].email;
      }
    },
    getTotalOrders: state => {
      return state.orders.length;
    },
    getBooksNameList: state => {
      return state.booksList.map((item) => item.title);
    },
  },



})
