let val;
const taskInput = document.querySelector('#task');
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//eventListener
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
clearBtn.addEventListener('click', clearTasks);
taskList.addEventListener('click', deleteTask);
filter.addEventListener('keyup', filterTasks);

//delete one task
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

//load tasks
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(element => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(element));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });


}
//clear tasks
function clearTasks(e){
    taskList.innerHTML = '';
    localStorage.clear();
    e.preventDefault();
}

//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task!');
        return;
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);
    storeToLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

//store task to local storage
function storeToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//filter taskList
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
        } else {
        task.style.display = 'none';
        }
    });
}

