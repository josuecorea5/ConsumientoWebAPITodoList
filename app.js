let URLAPI = "http://localhost:31291/api/todolist";
let todoList = document.getElementById('todoList');
let sendTask = document.getElementById('sendTask');
let inputName = document.getElementById('Nombre');
let textAreaDescription = document.getElementById('Descripción');
let idTask = document.getElementById('id');


const Delete =  (id) => {
    fetch(URLAPI + "/" + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if(response.ok) {
            return response.text();
        }else {
            alert('Error al ejecutar solicitud');
        }
    }).then((data) => {
        console.log(data);
        Get();
    })
}


const OpenEdit = (id, nombre, descripcion) => {
    idTask.value = id;
    inputName.value = nombre;
    textAreaDescription.value = descripcion;
}


const Edit =  () => {
    fetch(URLAPI,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            Id: idTask.value,
            Nombre: inputName.value,
            Descripcion: textAreaDescription.value
        })
    }).then((response) => {
        if(response.ok) {
            return response.text();
        }else {
            alert('Error al ejecutar solicitud');
        }
    }).then((data) => {
        console.log(data);
        Get();
        idTask.value = "";
        inputName.value = "";
        textAreaDescription.value = "";
    })
}


const Get = () => {
    fetch(URLAPI).then((response) => (response.json()))
    .then((data) => {
        todoList.innerHTML= "";
        for(let i = 0; i < data.length; i++) {
            let divElement = document.createElement("div");
            let h2Element = document.createElement("h2");
            let spanElement = document.createElement("p");
            let buttonDelete = document.createElement("button");
            let buttonEdit = document.createElement("button");

            h2Element.innerHTML = `${data[i].nombre} <br />`
            spanElement.innerHTML = `${data[i].descripcion}`;
            buttonDelete.innerHTML = "Eliminar";
            buttonEdit.innerHTML = "Editar";
            buttonDelete.MiId = data[i].id;
            buttonDelete.addEventListener("click", (myButton) => {
                Delete(myButton.target.MiId);
            })


            buttonEdit.MiId = data[i].id;
            buttonEdit.MiNombre = data[i].nombre;
            buttonEdit.MiDescripcion = data[i].descripcion;
            buttonEdit.addEventListener("click", (myButton) => {
                OpenEdit(myButton.target.MiId,myButton.target.MiNombre, myButton.target.MiDescripcion);
            })

            divElement.appendChild(h2Element);
            divElement.appendChild(spanElement);
            divElement.appendChild(buttonEdit);
            divElement.appendChild(buttonDelete);
            todoList.className = 'list-tareas';
            buttonEdit.className = 'editButton';
            buttonDelete.className = 'editButton';
            divElement.className = 'container-todo'
            todoList.appendChild(divElement);
            
        }
    })
    
}


Get();

function Guardar() {
    if(idTask.value != "") {
        Edit();
    }else {
        Post();
    }
}


const Post =  () => {
    fetch(URLAPI, {
        method: "POST",
        body: JSON.stringify({
            Nombre: inputName.value,
            Descripcion: textAreaDescription.value
        }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        }
    }).then((response) => {
        if(response.ok) {
            return response.text();
        }else {
            alert('Error al ejecutar solicitud');
        }
    }).then((data) => {
        console.log(data);
        Get();
        idTask.value = "";
        inputName.value = "";
        textAreaDescription.value = "";
    })
}



