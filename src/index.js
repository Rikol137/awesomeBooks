const booksList = document.querySelector('.main-books-list-ul');
const form = document.querySelector('.main-form-form');
const formTitle = document.querySelector('.main-form-form-title');
const formAuthor = document.querySelector('.main-form-form-author');
let books = [];

function updateLocalStorage() {
  // Add item to local storage
  localStorage.setItem('booksArray', JSON.stringify(books));
}

function removeBook(title) {
  // Remove book from the books array
  books = books.filter((book) => book.title !== title);
}

function addBookToView(title, author) {
  books.push({
    title,
    author,
  });
  formTitle.value = '';
  formAuthor.value = '';

  const bookItem = document.createElement('li');
  bookItem.classList.add('main-books-list-ul-li');
  bookItem.innerHTML = `
          <p class="main-books-list-ul-li-title">${title}</p>
          <p class="main-books-list-ul-li-author">${author}</p>
          <button class="main-books-list-ul-li-button">Remove</button>
          <hr class="main-books-list-ul-li-hr">
      `;
  booksList.appendChild(bookItem);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToView(formTitle.value, formAuthor.value);
  updateLocalStorage();
});

// Remove books from the List and from the books array
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('main-books-list-ul-li-button')) {
    e.target.parentElement.remove();

    const title = e.target.parentElement.querySelector('.main-books-list-ul-li-title').innerText;
    removeBook(title);
    updateLocalStorage();
  }
});

// Get books from local storage
document.addEventListener('DOMContentLoaded', () => {
  const books = JSON.parse(localStorage.getItem('booksArray'));
  if (books) {
    books.forEach((book) => {
      addBookToView(book.title, book.author);
    });
  }
});