let draggedTask = null;

function addTask() {

    const title =
        document.getElementById("taskTitle")
        .value.trim();

    const description =
        document.getElementById("taskDescription")
        .value.trim();

    const dueDate =
        document.getElementById("taskDueDate")
        .value;

    const label =
        document.getElementById("taskLabel")
        .value;

    if(!title){
        alert("Please enter a task title");
        return;
    }

}