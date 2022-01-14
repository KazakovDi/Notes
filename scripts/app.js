// import =============== 
import {Dates, dataArray} from "/scripts/storage.js"
import {notesCounter, showForm, ArchiveTable, MainTable} from "/scripts/render.js"
// funcs =============== 
function showNote(values) {
    const div = document.createElement("div")
    div.classList.add("table-item")
    div.id = MainTable.childNodes.length - 3
    values.forEach(value=> {
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
}
export function fastCreate(parent, element, content, className) {
    const newElement = document.createElement(element)
    if(Array.isArray(content) && content.length > 0)
        newElement.innerHTML = content.map(item=> item.toLocaleDateString())
    else if(Array.isArray(content) && content.length == 0)
        newElement.innerHTML = "No dates"
    else if(!Array.isArray(content) && typeof(content) ===  "object") 
        newElement.innerHTML = content.toLocaleDateString()  
    else {
        newElement.innerHTML = content
    }
    if(className !== undefined)
        newElement.classList.add(className)
    parent.appendChild(newElement)
} // Быстрое создание нового элемента, с присваиванием ему класса, и добавлением к родителю
function createItem(values) {
    const auxArray = []
    values.forEach(value => auxArray.push(value))
    showNote(values)
    dataArray.push(auxArray)
    notesCounter()
} // Создание новых элементов таблицы
function tableControls(e,table, oppositeTable) {
        const target = e.target.classList[0]
        const tableItem = e.target.parentElement.parentElement
        if(target === "delBtn") {
            dataArray.splice(tableItem.id,1)
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
            dataArray.splice(0,dataArray.length)
            console.log(dataArray)
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
dataArray.forEach(item=> {
        showNote(item)
})
closeForm.forEach(btn=> {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        btn.parentElement.classList.remove("active")
    })
})
    // event listeners
toggleTable.addEventListener("click", ()=> {
        if(ArchiveTable.classList.contains("active")) {
            toggleTable.innerHTML = "Show archive"
            
            ArchiveTable.classList.remove("active")
        } else {
            toggleTable.innerHTML = "Hide archive"
            ArchiveTable.classList.add("active")
        }
})

showNoteFormBtn.addEventListener("click", ()=> showForm(createNoteForm))

createNoteForm.addEventListener("submit", e=> {
    e.preventDefault()
    const auxArray=[
                        nameInputCreate.value, 
                        new Date(),
                        categoryOptionsCreate.value,
                        noteContentCreate.value,
                        Dates(noteContentCreate.value)
                    ]
    createItem(auxArray)
})
MainTable.addEventListener("click", e=> tableControls(e, MainTable, ArchiveTable))
ArchiveTable.addEventListener("click", e=> tableControls(e, ArchiveTable, MainTable))