const library = [];

function Book(title, author, num_pages, has_read = false) {
    if (!new.target) {
        throw error("Error: Must be used with the 'new' constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.has_read = has_read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.num_pages} pages, ${this.has_read ? "has read" : "not read yet"}`;
    }
}

function addBookToLibrary(bookData) {
    const new_book = new Book();
    for (let [key, value] of bookData) {
        new_book[key] = value;
    }

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
        listItem.textContent = book.info();

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