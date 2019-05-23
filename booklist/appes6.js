class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list')
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = ` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
        `;
    
        list.appendChild(row);
    }


    showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Inset alert
    container.insertBefore(div, form)

    // Time out after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

    }

    deleteBook(target) {
        if(target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks(); 
        books.forEach(function(book){
            const ui = new UI;

            ui.addBookToList(book);
        })

    }

    static addBook(book) {
        const books = Store.getBooks(); 
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        
    }
    
    static removeBook(isbn) {
        const books = Store.getBooks(); 
        console.log(isbn);

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Event Listener display books
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listeners add book
document.getElementById('book-form').addEventListener('submit', 
    function(e){ 
        e.preventDefault();

        // Get form values
        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value;

        // Instantiate book
        const book = new Book(title, author, isbn);
        console.log(book);
        
        // Instantiate UI
        const ui = new UI();

        // Validate
        if(title === '' || author === '' || isbn === ''){
            // Error alert
            ui.showAlert('Please fill n all feilds', 'error');
        } else {
            // Add book to list
            ui.addBookToList(book); 

            Store.addBook(book);
            
            // Show success alert
            ui.showAlert('Book added', 'success');

            // Clear fields
            ui.clearFields();
        }

});


// Event listner for Delete
document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();

    // Instatiate UI
    const ui = new UI();

    //  Delete Boook
    ui.deleteBook(e.target);

    // Remove for LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show Alert
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
    
});