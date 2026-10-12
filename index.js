const AddTask = document.getElementById('button-add'); 
const Tasks = document.getElementById('unorder-list'); 
const SavedTasks = document.getElementById('list-task'); 
const InputTask = document.getElementById('input-add');
const ClearAll = document.getElementById('button-all'); 
const contator = document.getElementById('contator'); 
const searchButton = document.getElementById('button-search');
const SearchInput = document.getElementById('search');
const elError = document.getElementById('siError')
const deleteError = theError();
const searhForTask = searchTask();

function theError() { 
let timeout; 
    return () =>
    {
        clearTimeout(timeout)
        timeout = setTimeout(() => { 
            elError.textContent = ""; 
        }, 2000);
    }
} // función para eliminar el error luego de 2 sg.

function displayError(errorToDisplay){
     elError.textContent = errorToDisplay; 
     deleteError()
} // función para mostrar el error 

function elContador(state, valueAdded) 
{
    if(state)
        contator.textContent =  Number(contator.textContent) + valueAdded

    else
        contator.textContent = Number(contator.textContent) - valueAdded
} // función para aumentar la cantidad de tareas o eliminarlas y mostrarlas en pantalla.

function deleteValue(text){
    text.value = "";
} // función para eliminar el texto de cualquier input

function returnTask(){
    const data = localStorage.getItem('myTasks');
    if(data)
    {
        const tasksArray = JSON.parse(data);
        tasksArray.forEach(homework => {
            createTask(homework, false);
    })
}} // función para que se recarguen las tareas

function saveTasktoStorage(saveItem){
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasksArray.push(saveItem);
    localStorage.setItem('myTasks', JSON.stringify(tasksArray));
} /// función para guardar las tareas

function createTask(taskToAdd, save){ 
            const NewList = document.createElement('li'); /// lo creo
            const NewTask = document.createElement('span');
            const NewTrash = document.createElement('i'); 

            Tasks.append(NewList); // lo agrego 
            NewList.append(NewTask); 
            NewList.append(NewTrash);

            NewTask.textContent = taskToAdd // le agrego el contenido de adentro
            NewTask.classList.add('letter') // le coloco las clases
            NewTrash.classList.add('delete', 'fa-solid', 'fa-trash-can'); 
            deleteValue(InputTask) 
            elContador(true, 1)

            if(save)
                saveTasktoStorage(taskToAdd)
} // función para mostrar las tareas en pantallas

function removeTaskFromStorage(taskText) {
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasksArray = tasksArray.filter(t => t !== taskText);
    localStorage.setItem('myTasks', JSON.stringify(tasksArray));
} // función para eliminar tareas del storage

function searchTask()
{
    let palabra; 

    return ((task) => {
        const LetterSpan = document.querySelectorAll('.letter')
        LetterSpan.forEach(letter => 
        {  
            palabra = letter.innerText.toLowerCase(); 
            letter.parentElement.style.display = "flex";

            if(!palabra.includes(task))
                letter.parentElement.style.display = "none";       
        })
    })
} // función para filtrar las tareas por busqueda y mostrarlas 

searchButton.addEventListener("click", () => 
{
    deleteValue(SearchInput)
    const liststasks = document.querySelectorAll('li'); 
    liststasks.forEach(list => {
        list.style.display = "flex";
    })
}) // botón que muestra todas las tareas después de una búsqueda.

AddTask.addEventListener("click", () => {
    try { 
            const taskAdded = InputTask.value.trim()

            if(taskAdded){
                saveTasktoStorage(taskAdded)
                createTask(taskAdded)
            }

            else
                throw new Error('Ingresa Una Tarea!')
        
    } catch (error) {

        displayError(error)
    }
}) // botón que está pendiente de si se quiere agregar una tarea, en caso de oprimir el botón sin tarea entonces se muestra un error


Tasks.addEventListener("click", e => 
    {
        if(e.target.classList.contains("delete"))
        {
            const listDelete = e.target.closest('li');
            removeTaskFromStorage(listDelete.textContent)
            listDelete.remove();
            elContador(false, 1)
        }
    }) // botón para targetear una tarea que se quiere eliminar.

ClearAll.addEventListener("click", () => {
    try {
            const listItems = document.querySelectorAll('li')
            if(listItems.length === 0)
                throw new Error('No Hay Tareas Aún')
            else
            {
                listItems.forEach(item => { 
                removeTaskFromStorage(item.textContent)
                item.remove();
                elContador(false, contator.textContent)})
            }

    } catch (error) {
        displayError(error)
    }
}) // botón que en caso de que hayan tareas, se llaman a las funciones que se encargan de eliminarlas en caso que no hayan tareas y se oprima el botón entonces se atrapa el error, y se llama a la función que lo muestra.
   

SearchInput.addEventListener("keyup", () => 
{ 
    let inputEnter = SearchInput.value.trim().toLowerCase(); 
    searhForTask(inputEnter)
}) // botón que está atento cuando se escribe texto y envía ese texto para que se busque la tarea.

returnTask() // esta función es la primera en inicializarse, para que se creen las tareas. 

