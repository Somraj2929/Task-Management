const taskList = document.querySelector('#task-list');
const addTaskForm = document.querySelector('#add-task-form');

// Fetch tasks from API and display them
async function displayTasks() {
  try {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <span class="title">${task.title}</span>
          <div class="description">${task.description}</div>
        </div>
       
        <div class="actions">
          <button style="background: #3e8e41; color: white; padding: 2px; width: 50px; height: 30px;" class="edit-btn" data-id="${task.id}">Edit</button>
          <button style="background: red; color: white; padding: 2px; width: 50px; height: 30px;" class="delete-btn" data-id="${task.id}">Delete</button>
        </div>
        <br>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}

// Handle form submission
addTaskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(addTaskForm);
  const title = formData.get('title');
  const description = formData.get('description');
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      addTaskForm.reset();
      await displayTasks();
    }
  } catch (error) {
    console.error(error);
  }
});

// Handle edit button click
taskList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const taskId = event.target.getAttribute('data-id');
    const taskTitle = event.target.parentElement.previousElementSibling.querySelector('.title').textContent;
    const taskDescription = event.target.parentElement.previousElementSibling.querySelector('.description').textContent;
    const newTitle = prompt('Enter new title:', taskTitle);
    const newDescription = prompt('Enter new description:', taskDescription);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });
      if (response.ok) {
        await displayTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// Handle delete button click
taskList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const taskId = event.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await displayTasks();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});

// Display tasks on page load
displayTasks();
