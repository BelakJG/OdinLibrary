const library = [];

class Book {
    _id = crypto.randomUUID();
    _title;
    _author;
    _num_pages;
    _has_read = false;

    constructor(bookData) {
        for (let [key, value] of bookData) {
            this[key] = value;
        }
    }

    get id() {
        return this._id;
    }

    get info() {
        return `${this._title} by ${this._author}, ${this._num_pages} pages, ${this._has_read ? "has read" : "not read yet"}`;
    }
}

function addBookToLibrary(bookData) {
    console.log(bookData);
    const new_book = new Book(bookData);

    library.push(new_book);
}

function removeBookFromLibrary(book) {
    const index = library.indexOf(book);
    if (index > -1) {
        const bookID = book.id;
        library.splice(index, 1);

        document.querySelector(`#book-${bookID}`).remove();
    }
}

function displayBooks() {
    const list = document.querySelector("#books-list");
    list.replaceChildren();

    for (const book of library) {
        const listItem = document.createElement("li");
        listItem.classList.add("book");
        listItem.id = "book-" + book.id;
        listItem.textContent = book.info;

        const removeButton = document.createElement("button");
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(book);
        });
        listItem.appendChild(removeButton);

        list.appendChild(listItem);
    }
}

const form = document.querySelector("#bookForm");
function newBook() {
    const backdrop = document.querySelector("#formBackdrop")
    form.classList.add("show-form");
    backdrop.classList.add("show-form");
}
function closeForm() {
    const backdrop = document.querySelector("#formBackdrop")
    form.classList.remove("show-form");
    backdrop.classList.remove("show-form");
}

form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const data = new FormData(form);

    addBookToLibrary(data)

    closeForm();
    displayBooks();
});