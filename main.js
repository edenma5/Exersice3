let todo_wrapper = document.querySelector('.wrapper');
let newTodo = document.querySelector('.todo_name');
let addTodo = document.querySelector('.add_todo');
let hiddenInput = document.querySelector('.hidden')
let todoList = [];

// const getDataFromLS = () => {
//     if (!localStorage.getItem('data'))
//         localStorage.setItem('data', JSON.stringify(['eden', 'maimon']))

//     else {
//         const data = JSON.parse(localStorage.getItem('data'));
//         console.log(data);

//         for (let i = 0; i < data.length; i++) {
//             let newListBox = document.createElement('div');
//             newListBox.className = 'item';
//             newListBox.setAttribute('draggable', 'true');
//             todo_wrapper.appendChild(newListBox);

//             let newTodo_list = document.createElement('input');
//             newTodo_list.className = 'input';
//             newTodo_list.setAttribute('placeholder', 'Write Here..')
//             newTodo_list.value = data[i];
//             newListBox.appendChild(newTodo_list);

//             let delete_todo = document.createElement('div');
//             delete_todo.className = 'delete';
//             delete_todo.innerHTML = '🚮';
//             newListBox.appendChild(delete_todo);
//             delete_todo.addEventListener('click', () => {
//                 todo_wrapper.removeChild(newListBox);
//                 data.splice(i, 1)
//                 localStorage.setItem('data', JSON.stringify(data))
//             })

//         }
//         return data;
//     }
// }
// getDataFromLS()



addTodo.addEventListener('click', () => {
    //יצירת אלמנטים
    let newListBox = document.createElement('div');
    newListBox.className = 'item';
    newListBox.setAttribute('draggable', 'true');
    todo_wrapper.appendChild(newListBox);

    let newTodo_list = document.createElement('input');
    newTodo_list.className = 'input';
    newTodo_list.setAttribute('placeholder', 'Write Here..')

    newListBox.appendChild(newTodo_list);

    //לולאה על כל פילד לצורך מחיקה
    const item = document.querySelectorAll('.item');
    for (let i = 0; i < item.length; i++) {
        let delete_todo = document.createElement('div');
        delete_todo.className = 'delete';
        delete_todo.innerHTML = '✖️';
        newListBox.appendChild(delete_todo);
        delete_todo.addEventListener('click', () => {
            todo_wrapper.removeChild(item[i]);
        })
    }


    //Drag And Drop Functionality
    item.forEach(item => {
        item.addEventListener('dragstart', () => {
            item.classList.add('dragging')
        })
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        })
    })
    todo_wrapper.addEventListener('dragover', e => {
        e.preventDefault;
        const afterElement = getDragAfterElement(todo_wrapper, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            todo_wrapper.appendChild(draggable);
        } else {
            todo_wrapper.insertBefore(draggable, afterElement)
        }
    })

    function getDragAfterElement(container, y) {
        const draggableElement = [...container.querySelectorAll('.item:not(.dragging)')];
        return draggableElement.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return {
                    offset: offset,
                    element: child
                }
            } else {
                return closest;
            }
        }, {
            offset: Number.NEGATIVE_INFINITY
        }).element
    }
})