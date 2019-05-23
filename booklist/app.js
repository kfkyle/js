// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI constructor
function UI() {}

// Show Alert
UI.prototype.showAlert = function(message, className){
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

// Define Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
}

// Define Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Define Add book to list
UI.prototype.addBookToList = function(book){
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

// Event listeners
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

    ui.deleteBook(e.target);

    // show Alert

    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
    
});