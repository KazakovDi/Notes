// import =============== 
import {Dates, imitationArray} from "/scripts/storage.js"
import {notesCounter, showForm, ArchiveTable, MainTable} from "/scripts/render.js"

// funcs =============== 
export function fastCreate(parent, element, content, className) {
    const newElement = document.createElement(element)
    newElement.innerHTML = content
    if(className !== undefined) {
        newElement.classList.add(className)
    }
    parent.appendChild(newElement)
} // Быстрое создание нового элемента, с присваиванием ему класса, и добавлением к родителю
function createItem(values) {
    const div = document.createElement("div")
    div.classList.add("table-item")
    values.forEach(value => {
        fastCreate(div, "p", value)
    })
    const controls = document.createElement("div")
    controls.classList.add("controls")
    fastCreate(controls, "button", "✎", "editBtn")
    fastCreate(controls, "button", "🗂", "archBtn")
    fastCreate(controls, "button", "🗑", "delBtn")
    div.appendChild(controls)
    MainTable.appendChild(div)
    notesCounter()
} // Создание новых элементов таблицы
function tableControls(e,table, oppositeTable) {
        const target = e.target.classList[0]
        const tableItem = e.target.parentElement.parentElement
        if(target === "delBtn") {
            tableItem.remove()
            notesCounter()
        }   
        if(target === "archBtn") {
            oppositeTable.appendChild(tableItem)
            notesCounter()
        }
        if(target === "editBtn") {
            showForm(editForm)
            const div = tableItem.childNodes
            nameInputEdit.value = div[0].innerHTML
            categoryOptionsEdit.value = div[2].innerHTML
            noteContentEdit.value = div[3].innerHTML
            editNoteBtn.addEventListener("click", e=> {
                e.preventDefault()
                div[0].innerHTML = nameInputEdit.value
                div[2].innerHTML = categoryOptionsEdit.value
                div[3].innerHTML = noteContentEdit.value
                notesCounter()
            })
        }
        if(target === "deleteAll") {
            table.querySelectorAll(".table-item").forEach(item=> {item.remove()})
            notesCounter()
        }
        if(target === "archiveAll") {
            table.querySelectorAll(".table-item").forEach(item=> {oppositeTable.appendChild(item)})
            notesCounter()
        }
} // Управление таблицами

// variables ===============

    const toggleTable = document.querySelector("#toggleTable")

    const createNoteForm = document.querySelector("#createNoteForm")
    const editForm = document.querySelector("#editForm")
    const showNoteFormBtn = document.querySelector("#showNoteForm")
    const nameInputCreate = createNoteForm.querySelector("input[name=name")
    const noteContentCreate = createNoteForm.querySelector("textarea")
    const categoryOptionsCreate = createNoteForm.querySelector("select")

    const nameInputEdit = editForm.querySelector("input[name=name")
    const noteContentEdit = editForm.querySelector("textarea")
    const categoryOptionsEdit = editForm.querySelector("select")
    const editNoteBtn = editForm.querySelector("#editNote")
    const closeForm = document.querySelectorAll(".closeForm")

// main code =============
imitationArray.forEach(item=> {
    createItem(item)
}) // Заполнение заранее подготовленными данными
closeForm.forEach(btn=> {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        btn.parentElement.classList.remove("active")
    })
})
    // event listeners
toggleTable.addEventListener("click", ()=> {
        if(ArchiveTable.classList.contains("active")) {
            toggleTable.innerHTML = "Показать архив"
            
            ArchiveTable.classList.remove("active")
        } else {
            toggleTable.innerHTML = "Скрыть архив"
            ArchiveTable.classList.add("active")
        }
})

showNoteFormBtn.addEventListener("click", ()=> showForm(createNoteForm))

createNoteForm.addEventListener("submit", e=> {
    e.preventDefault()
    const auxArray=[
                        nameInputCreate.value, 
                        new Date().toLocaleDateString(),
                        categoryOptionsCreate.value,
                        noteContentCreate.value,
                        Dates(noteContentCreate.value)
                    ]
    createItem(auxArray)
})
MainTable.addEventListener("click", e=> tableControls(e, MainTable, ArchiveTable))
ArchiveTable.addEventListener("click", e=> tableControls(e, ArchiveTable, MainTable))