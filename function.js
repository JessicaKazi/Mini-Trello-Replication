// stores all the tasks being dragged to reassign it to a new position. It's a temporary holder.
let dragged = null;

window.onload = function(){

    let savedTasks =
    localStorage.getItem("tasks");

    if(savedTasks){
        let tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task){
            createTask(task.column, task.title, task.description, task.date, task.label);
        });
    }
    updateCount();
}

function addTask(column){

    let title = "";
    let description = "";
    let date = "";
    let label = "";

    if(column === "todo"){
        title = document.getElementById("todoTitle").value;
        description = document.getElementById("todoDescription").value;
        date = document.getElementById("todoDate").value;
        label = document.getElementById("todoLabel").value;
    }

    if(column === "doing"){
        title = document.getElementById("doingTitle").value;
        description = document.getElementById("doingDescription").value;
        date = document.getElementById("doingDate").value;
        label = document.getElementById("doingLabel").value;
    }

    if(column === "done"){
        title = document.getElementById("doneTitle").value;
        description = document.getElementById("doneDescription").value;
        date = document.getElementById("doneDate").value;
        label = document.getElementById("doneLabel").value;
    }

    if(title === ""){
        alert("Enter a task title");
        return;
    }

    createTask(
        column,
        title,
        description,
        date,
        label
    );

    clearInputs(column);

    saveTasks();
}

// This function allows the user to select what the task is for, used if statements as it's easier to understand.
// It also enables the task to be moved, as the draggable is set to true.

function createTask(column,title,description,date,label){

    let task =
    document.createElement("div");

    task.className = "task";
    task.draggable = true;

    let labelText = "";

    if(label === "church"){
        labelText = "Church";
    }

    if(label === "work"){
        labelText = "Work";
    }

    if(label === "personal"){
        labelText = "Personal";
    }

    if(label === "school"){
        labelText = "School";
    }

    task.innerHTML = `
        <span class="label ${label}">
            ${labelText}
        </span>

        <h4>${title}</h4>

        <p>${description}</p>

        <small>
            Due: ${date}
        </small>
    `;

    let buttons = document.createElement("div");

    buttons.className = "task-buttons";

    let editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.className = "edit-btn";

    let deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.className = "delete-btn";

    let doneBtn = document.createElement("button");

    doneBtn.textContent = "Done";

    doneBtn.className = "done-btn";

    editBtn.onclick = function(){
        let newTitle =
        prompt("Edit Title", task.querySelector("h4").textContent);

        if(newTitle){task.querySelector("h4").textContent = newTitle;
            saveTasks();
        }
    };

    deleteBtn.onclick = function(){task.remove();
        updateCount();
        saveTasks();
    };

    doneBtn.onclick = function(){document.getElementById("done").appendChild(task);
        updateCount();
        saveTasks();
    };

    task.addEventListener("dragstart", function(){
        dragged = task;
    });

    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);
    buttons.appendChild(doneBtn);

    task.appendChild(buttons);

    document.getElementById(column).appendChild(task);
    updateCount();
}

let lists = document.querySelectorAll(".task-list");

lists.forEach(function(list){ list.addEventListener("dragover",
    function(e){e.preventDefault();}); 
    list.addEventListener("drop", function(){
        if(dragged){ list.appendChild(dragged);
            updateCount();
            saveTasks();
        }
    });
});

function saveTasks(){

    let tasks = [];

    document.querySelectorAll(".task").forEach(function(task){

        tasks.push({

            column:task.parentElement.id,

            title:task.querySelector("h4").textContent,

            description:task.querySelector("p").textContent,

            date:task.querySelector("small").textContent.replace("Due: ",""),

            label:task.querySelector(".label").classList[1]
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)
    );
}

// Gets all the values that the user puts into the input fields

function clearInputs(column){

    if(column === "todo"){
        document.getElementById("todoTitle").value = "";
        document.getElementById("todoDescription").value = "";
        document.getElementById("todoDate").value = "";
        document.getElementById("todoLabel").value = "";
    }

    if(column === "doing"){
        document.getElementById("doingTitle").value = "";
        document.getElementById("doingDescription").value = "";
        document.getElementById("doingDate").value = "";
        document.getElementById("doingLabel").value = "";
    }

    // I don't need this anymore, but it's breaking my code. 
    // Reminder to search on overflow stack on how to remove it properly

    if(column === "done"){
        document.getElementById("doneTitle").value = "";
        document.getElementById("doneDescription").value = "";
        document.getElementById("doneDate").value = "";
        document.getElementById("doneLabel").value = "";
    }
}

function updateCount(){

    document.getElementById("todoCount").textContent = document.getElementById("todo").children.length;

    document.getElementById("doingCount").textContent = document.getElementById("doing").children.length;

    document.getElementById("doneCount").textContent = document.getElementById("done").children.length;
}
