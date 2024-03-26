
const taskList = document.getElementById("taskList");
const allTasks = document.getElementById("listGroupTasks");

function addTask(){
    if (inputTaskbar.value === "") {
        alert("Du musst etwas hineinschreiben!");
    }
    else{
        // Erstelle eines neuen Aufgaben-Elements (newTask)
        const taskItem = document.createElement('div');

        const span = document.createElement('span');
        taskItem.appendChild(span);

        span.textContent = inputTaskbar.value;
        span.id = 'newSpan';
        taskItem.classList.add('newTask'); // Klasse zum Element hinzufügen
        taskItem.id = 'newTask'; // ID zum Element hinzufügen

        // delete Button erstellen
        const deleteBtn = document.createElement('button'); // .classList.add() fügt eine neue Klasse für das Element hinzu, damit man es in Css stylen kann
        deleteBtn.textContent = "delete"; // Text für Button
        deleteBtn.classList.add('newDeleteBtn');

        // editieren Button erstellen
        const editBtn = document.createElement('button');
        editBtn.textContent = "edit";
        editBtn.classList.add('editBtn');
        editBtn.id = 'editBtn';

        // appendChild() fügt child zur Liste hinzu
        listGroupTasks.appendChild(taskItem); // neuer Task wird hinzugefügt
        taskItem.appendChild(deleteBtn); // neuer DeleteBtn wird zu Task hinzugefügt
        taskItem.appendChild(editBtn); // neuer EditBtn wird zu einem Task hinzgefügt

        // Klick-Event zum Löschen
        deleteBtn.addEventListener('click', deleteTask); 
        editBtn.addEventListener('click', editTask);

        //Eingabefeld leeren
        inputTaskbar.value = "";

    }
}

function deleteTask(event) {
    let parentElement = event.target.parentNode; // event ist das Ereignisobjekt von oben, beim Klicken. Von Event holen wir uns den Parent und entfernen diesen.
    parentElement.remove();
}

// Es darf nur mit Backspace gelöscht werden, solange Aufgaben in der Liste eingetragen sind
function backspace() {
    if (allTasks.lastChild) {    // allTasks.lastChild gibt Element oder null zurück
        allTasks.lastChild.remove();      // es wird gelöscht, solange ein letztes Child von allTasks besteht und die Taskeingabezeile leer ist
    }

}

function editTask(event) {
    // übergeordnete Element mit Klasse 'newTask', vom Klickeventobjekt des Editbutton
    let taskDiv = event.target.closest('.newTask');

    // Das <span>-Element innerhalb des <div>-Elements
    let span = taskDiv.querySelector('span');

    let input = prompt('Neue Aufgabe');
    span.textContent = input;
}

// Aufgabe per Enter-Taste hinzufügen
inputTaskbar.addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        addTask();
    }
});

// Aufgabe per Backspace-Taste löschen
document.addEventListener('keydown', function(event) {
    // Prüft, ob die Backspace-Taste gedrückt wurde
    if (event.key === 'Backspace') {
        // Prüft, ob das aktuell fokussierte Element NICHT die inputTaskbar ist
        if (document.activeElement !== inputTaskbar) {
            // Ruft die backspace Funktion auf, um die letzte Aufgabe zu löschen
            backspace();
            // Verhindert das standardmäßige Verhalten der Backspace-Taste (z.B. Zurück-Navigation im Browser)
            event.preventDefault();
        }
    }
});





