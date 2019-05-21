// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Define Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
} 

// Get tasks for local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
    tasks = [];
    } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){ 
    const li = document.createElement('li');
    li. className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-ban"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
    });
}

// Define add task
function addTask(e) {
   
    if (taskInput.value === '') {
        alert('Add a task');
    } else {

        // Create li element
        const li = document.createElement('li');
        //  Add a class
        li. className = 'collection-item';
        // Create new node and append to li
        // you can use inner HTML instead of text node
        li.appendChild(document.createTextNode(taskInput.value));


        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fas fa-ban"></i>';
        // Append the line to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = "";    
    }

    e.preventDefault();
}

// Define Store Task
function storeTaskInLocalStorage(task) {
    // Initialize a variable not defining it
    let tasks;

    // Check local storage for other tasks
    if(localStorage.getItem('tasks') === null){
        // if there are not other tasks, set tasks to empty array
        tasks = [];
    } else {
        // else take tasks and parse them into JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Push new task on to tasks
    tasks.push(task);

    // Set item in local storage as a string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Define Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to remove this item')) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Defining Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){
    tasks = [];
    } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            // If the text content === the task in ls then use splice to replace index 1 with nothing
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Define Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear Tasks form ls
    clearTaskFromLocalStorage();

}

// Define Clear tasks form ls
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// Define Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        // -1 is when there is now value because the first letter is 0 index
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}



