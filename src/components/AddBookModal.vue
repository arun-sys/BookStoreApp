
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <div class="div">Add Book</div>
          <button type="button" class="btn-close" @click="close">x</button>
        </header>
        <section class="modal-body" id="modalDescription">
          <div class="modal-group">
            <label for="Title">Title</label>
            <input type="text" v-model="book.title" name="Title" class="form-control" required />
          </div>
          <div class="modal-group">
            <label for="author-name">Author name</label>
            <input
              type="text"
              v-model="book.author"
              name="author-name"
              class="form-control"
              required
            />
          </div>
          <div class="modal-group">
            <label for="Description">Description</label>
            <input
              type="text"
              v-model="book.description"
              name="Description"
              class="form-control-Description"
              required
            />
          </div>
          <div class="modal-group">
            <label for="Price">Price</label>
            <input type="number" v-model="book.price" name="Price" class="form-control" required />
          </div>
          <div class="modal-group">
            <label for="Image">Image</label>
            <input
              v-on:change="chooseImage($event.target.files)"
              type="file"
              name="Image"
              class="form-control"
              required
            />
          </div>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-green" @click="addBook">Add</button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      showModal: false,
      book: {
        title: "",
        author: "",
        description: "",
        price: 0,
        image: "book-reader-solid.svg"
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.emptyBookObject();
    },
    addBook() {
      this.$store.state.booksList.push({
        title: this.book.title,
        author: this.book.author,
        description: this.book.description,
        price: this.book.price,
        // for uploading images. Image  will be available in src\assets. other wise Gui will not show.
        image: this.book.image,
        count: 1
      });
      this.$emit("close");
      this.emptyBookObject();
    },
    emptyBookObject() {
      this.book.title = "";
      this.book.author = "";
      this.book.description = "";
      this.book.price = 0;
      this.book.image = "book-reader-solid.svg";
    },
    chooseImage(file) {
      if (file[0].name) {
        this.book.image = file[0].name;
      }
    }
  }
};
</script>
