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

    get has_read() {
        return this._has_read;
    }

    toggleRead() {
        this._has_read = !this._has_read;
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
        const bookContainer = document.createElement("li");
        bookContainer.id = "book-" + book.id;
        bookContainer.classList.add("bookContainer")

        const bookText = document.createElement("p");
        bookText.classList.add("book");
        bookText.textContent = book.info;
        bookContainer.appendChild(bookText);

        const bookButtons = document.createElement("div");
        bookButtons.classList.add("bookButtons");
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(book);
        });
        bookButtons.appendChild(removeButton);

        const readButton = document.createElement("button");
        readButton.textContent = "Toggle read status";
        readButton.addEventListener("click", () => {
            book.toggleRead();
            bookText.textContent = book.info;
        });
        bookButtons.appendChild(readButton);

        bookContainer.appendChild(bookButtons);
        list.appendChild(bookContainer);
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