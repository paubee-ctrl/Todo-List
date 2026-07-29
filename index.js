
const AddTask = document.getElementById('button-add'); //button submit
const Tasks = document.getElementById('unorder-list'); //// ul
const SavedTasks = document.getElementById('list-task'); // article
const InputTask = document.getElementById('input-add');
const ClearAll = document.getElementById('button-all'); 
let contador = 3
let contator = document.getElementById('contator'); 
const ButtonDelete = document.getElementById('button-delete');
const SearchInput = document.getElementById('search');




ButtonDelete.addEventListener("click", e => 
{
    const liststasks = document.querySelectorAll('li'); 
    SearchInput.value = "";
    liststasks.forEach(list => {
        list.style.display = "flex";
    })
})

AddTask.addEventListener("click", AddTask => {
    if(InputTask.value.trim() !== "")
    {
            const InputValue = document.getElementById('input-add').value; //input text submitted
            const NewList = document.createElement('li'); /// lo creo
            const NewTask = document.createElement('span');
            const NewTrash = document.createElement('i'); 

            Tasks.append(NewList); // lo agrego 
            NewList.append(NewTask); 
            NewList.append(NewTrash);
            NewTask.innerText = InputValue.trim(); // le agrego el contenido de adentro
            NewTask.classList.add('letter')
            NewTrash.classList.add('delete', 'fa-solid', 'fa-trash-can'); // el icono
            InputTask.value= "";
            contador = contador + 1
            contator.innerHTML = `${contador}`
    }
})


Tasks.addEventListener("click", e => 
    {
        if(e.target.classList.contains("delete"))
        {
            const listDelete = e.target.closest('li');
            listDelete.remove();
            contador = contador - 1
            contator.innerHTML = `${contador}`
        }
            
    })

ClearAll.addEventListener("click", e => {
    const listItems = document.querySelectorAll('li')
    listItems.forEach(item => {
        item.remove();
        contador = 0
        contator.innerHTML = `${contador}`
    })
})
   
   
let palabra; 


SearchInput.addEventListener("keyup", e => 
{ 

    const LetterSpan = document.querySelectorAll('.letter')
    let inputEnter = SearchInput.value.trim().toLowerCase(); 
   
    
    LetterSpan.forEach(letter => 
    {  
        let wasFound = true
        palabra = letter.innerText.toLowerCase(); 
         letter.parentElement.style.display = "flex";


        for(let i = 0; i < inputEnter.length; i++)
        {
            if(palabra[i] !== inputEnter[i])
            {
                wasFound = false
                break; 
            }          
        }

        if(!wasFound) letter.parentElement.style.display = "none";       
    })
})


    


    
   
    



