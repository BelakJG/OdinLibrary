const library = [];

function Book(title, author, num_pages, has_read) {
    if (!new.target) {
        throw error("Error: Must be used with the 'new' constructor");
    }
    id: crypto.randomUUID;
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.has_read = has_read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.num_pages} pages, ${this.has_read ? "has read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, num_pages, has_read) {
    const new_book = new Book(title, author, num_pages, has_read);
    library.push(new_book);
}

function displayBooks() {
    const list = document.querySelector("#books-list");
    list.replaceChildren();
    
    for (const book of library) {
        const listItem = document.createElement("li");
        listItem.classList.add("book");
        listItem.textContent = book.info();
        list.appendChild(listItem);
    }
}