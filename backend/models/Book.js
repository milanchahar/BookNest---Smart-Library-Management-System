class Book {
  constructor({ bookId, title, author, isbn, category, isRare }) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.category = category;
    this.isRare = Boolean(isRare);
  }
}

export default Book;
