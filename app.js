const countTable = document.querySelector("#count-table")
function extract(items, arr) {
    items.forEach(item=> {
        const elements = [...item.childNodes]
        const mapedElements = elements.map(element=> element.innerHTML)
        arr.push(mapedElements[2])
    })
    return new Set(arr)
}
function showForm(form) {
    formContainer.classList.add("active")
    form.classList.add("active")
}
function notesCounter() {
    const items = countTable.querySelectorAll(".table-item")
    items.forEach(item=> item.remove())
    const Activeitems = MainTable.querySelectorAll(".table-item")
    const Architems = ArchiveTable.querySelectorAll(".table-item")
    const massActive=[]
    const massArchive=[]
    const newSet = extract(Activeitems, massActive)
    const archiveSet = extract(Architems, massArchive)
    for(let item of archiveSet) {
        newSet.add(item)
    }
    for(let elem of newSet) {
        const div = document.createElement("div")
        div.classList.add("table-item")
        const category = document.createElement("p")
        category.innerHTML = elem
        div.appendChild(category)
        const activeNotes = document.createElement("p")
        activeNotes.innerHTML = massActive.filter(item => item === elem).length
        div.appendChild(activeNotes)
        const archiveNotes = document.createElement("p")
        archiveNotes.innerHTML = massArchive.filter(item => item === elem).length
        div.appendChild(archiveNotes)
        countTable.appendChild(div)
    }  
}
function itemControls(e,table, oppositeTable) {
        const target = e.target.classList[0]
        if(target === "delBtn") {
            e.target.parentElement.parentElement.remove()
            notesCounter()
        }   
        if(target === "archBtn") {
            oppositeTable.appendChild(e.target.parentElement.parentElement)
            notesCounter()
        }
        if(target === "editBtn") {
            showForm(editForm)
            const div = e.target.parentElement.parentElement.childNodes
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
}
// variables
const showNoteFormBtn = document.querySelector("#showNoteForm")
const formContainer = document.querySelector("#formContainer")
const createNoteForm = document.querySelector("#createNoteForm")
const editForm = document.querySelector("#editForm")
const MainTable = document.querySelector("#main-table")
const ArchiveTable = document.querySelector("#archive-table")
const deleteAll = document.querySelectorAll(".deleteAll")
const archiveAll = document.querySelectorAll(".archiveAll")
// forms variables 
const nameInputCreate = createNoteForm.querySelector("input[name=name")
const noteContentCreate = createNoteForm.querySelector("textarea")
const categoryOptionsCreate = createNoteForm.querySelector("select")

const nameInputEdit = editForm.querySelector("input[name=name")
const noteContentEdit = editForm.querySelector("textarea")
const categoryOptionsEdit = editForm.querySelector("select")
const editNoteBtn = editForm.querySelector("#editNote")

const createNoteBtn = document.querySelector("#createNote")
const closeForm = document.querySelectorAll(".closeForm")
const forms = document.querySelectorAll(".form")
// eventListeners
showNoteFormBtn.addEventListener("click", ()=> showForm(createNoteForm))
closeForm.forEach(btn=> {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        btn.parentElement.classList.remove("active")
    })
})
function fastCreate(parent, element, content, className) {
    const newElement = document.createElement(element)
    newElement.innerHTML = content
    if(className !== undefined) {
        newElement.classList.add(className)
    }
    parent.appendChild(newElement)
}
createNoteForm.addEventListener("submit", e=> {
    e.preventDefault()
    const div = document.createElement("div")
    div.classList.add("table-item")
    fastCreate(div, "p", nameInputCreate.value)
    fastCreate(div, "p", new Date().toLocaleDateString())
    fastCreate(div, "p", categoryOptionsCreate.value)
    fastCreate(div, "p", noteContentCreate.value)
    fastCreate(div, "p", noteContentCreate.value.match(/\d{2}[./-]\d{2}[./-]\d{4}/g))
    const controls = document.createElement("div")
    controls.classList.add("controls")
    fastCreate(controls, "button", "изменить", "editBtn")
    fastCreate(controls, "button", "архив", "archBtn")
    fastCreate(controls, "button", "удалить", "delBtn")
    div.appendChild(controls)
    MainTable.appendChild(div)
    notesCounter()
})
MainTable.addEventListener("click", e=> itemControls(e, MainTable, ArchiveTable))
ArchiveTable.addEventListener("click", e=> itemControls(e, ArchiveTable, MainTable))