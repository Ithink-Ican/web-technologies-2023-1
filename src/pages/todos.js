import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import api from "../services/api.js";

const init = async () => {
    const { ok: isLogged, data } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const todoList = document.getElementById("todo-list");
    const createTodoForm = document.getElementById("todo-form");
    const emptyTodoTitle = document.querySelector(".todo_list__empty_title");

    createTodoForm.addEventListener("submit", createTodo);
    todoList.addEventListener('click', removeTodo);
    todoList.addEventListener('click', updateTodo);

    const getTodosRequest = async () => {
        return await api('/todo/', {
            method: 'GET'
        }
        ).then(obj => {return obj.data})
    }

    const getTodoRequest = async (id) => {
        return await api(`/todo/${id}`, {
            method: 'GET'
        }
        )
    }

    const createTodoRequest = async (values) => {
        return await api('/todo/', {
            method: 'POST',
            body: JSON.stringify({
                description: values
            })
        }
        )
    }

    const updateTodoRequest = async (id, value) => {
        return await api(`/todo/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                completed: value
            })
        }
        )
    }

    const deleteTodoRequest = async (id) => {
        return await api(`/todo/${id}`, {
            method: 'DELETE'
        }
        )
    }

    const renderTodo = (todo) => {
        let html = '';
        html += `
            <li class="todo_list__item" data-id=${todo.id}>
                <span class="todo_item__description">${todo.description}</span>
                <div class="todo_item__buttons">
                    <label>
                        <input type="checkbox" class="todo_item__status" 
                        value=${todo.completed} 
                        ${todo.completed ? "checked" : null} data-action="update">
                        <span></span>
                    </label>
                    <button type="button" class="delete_todo" data-action="delete">X</button>
                </div>
            </li>
        `
        todoList.insertAdjacentHTML('beforeend', html);
    }

    const getTodosAndRender = async () => {
        todoList.innerHTML = ''
        loading.start();
        let todos = await getTodosRequest();
        if (typeof todos !== 'undefined')
        {
            loading.stop()
            for (let todo of todos) {
                    renderTodo(todo);
                }
                if (todoList.children.length > 0) {
                    emptyTodoTitle.classList.add('none')
                }
        }
    }

    function createTodo (event) {
        event.preventDefault();
        let description = createTodoForm.elements['todo-description'].value;
        createTodoForm.elements["todo-description"].value = "";
        createTodoForm.elements["todo-description"].focus();
        createTodoRequest(description).then(
            (res) => {
                if (res.ok) {
                    getTodosAndRender();
                }
            })
    }

    createTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let description = createTodoForm.elements['todo-description'].value;
        createTodoForm.elements["todo-description"].value = "";
        createTodoForm.elements["todo-description"].focus();
        createTodoRequest(description).then(
            (res) => {
                if (res.ok) {
                    getTodosAndRender();
                }
            })
    })

    function removeTodo (event) {
        if (event.target.dataset.action === 'delete') {
            let id = event.target.parentElement.parentElement.dataset.id;
            deleteTodoRequest(id).then(
                () => {
                    getTodosAndRender();
                })
        }
    }

    async function updateTodo (event) {
        if (event.target.dataset.action === 'update') {
            event.preventDefault();
            let checkbox = event.target.parentElement.querySelector(".todo_item__status");
            let id = event.target.parentElement.parentElement.parentElement.dataset.id;
            let completed = checkbox.value === 'true';
            console.log(completed)
            await updateTodoRequest(id, !completed).then(
                (res) => {
                    if (res.ok) {
                        if (res.data["completed"]) {
                            checkbox["checked"] = true
                            checkbox.value = "true"
                        }
                        else {
                            checkbox["checked"] = false
                            checkbox.value = "false"
                        }
                        getTodosAndRender();
                    }
                })
        }
    }

    getTodosAndRender()
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}