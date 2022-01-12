const countTable = document.querySelector("#count-table")
function notesCounter() {
    const items = countTable.querySelectorAll(".table-item")
    items.forEach(item=> {
        item.remove()
    })
    const Activeitems = MainTable.querySelectorAll(".table-item")
    const Architems = ArchiveTable.querySelectorAll(".table-item")
    const massActive=[]
    const massArchive=[]
    Activeitems.forEach(item=> {
        const elements = [...item.childNodes]
        const arr = elements.map(element=> element.innerHTML)
        massActive.push(arr[2])
    })
    Architems.forEach(item=> {
        const elements = [...item.childNodes]
        const arr = elements.map(element=> element.innerHTML)
        massArchive.push(arr[2])
    })
    const newSet = new Set(massActive)
    const archiveSet = new Set(massArchive)
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
const countBtn = document.querySelector("#count")
// variables
const showNoteFormBtn = document.querySelector("#showNoteForm")
const createFormContainer = document.querySelector("#formContainer")
const createNoteForm = document.querySelector("#createNoteForm")
const editForm = document.querySelector("#editForm")
const MainTable = document.querySelector("#main-table")
const ArchiveTable = document.querySelector("#archive-table")
const deleteAll = document.querySelectorAll(".deleteAll")
const archiveAll = document.querySelector("#archiveAll")
const desArchiveAll = document.querySelector("#desArchiveAll")
// forms variables 
const nameInputCreate = createNoteForm.querySelector("input[name=name")
const noteContentCreate = createNoteForm.querySelector("textarea")
const categoryOptionsCreate = createNoteForm.querySelector("select")

const nameInputEdit = editForm.querySelector("input[name=name")
const noteContentEdit = editForm.querySelector("textarea")
const categoryOptionsEdit = editForm.querySelector("select")
const editNoteBtn = editForm.querySelector("#editNote")

const createNoteBtn = document.querySelector("#createNote")
const closeForm = document.querySelector("#closeForm")

// eventListeners
showNoteFormBtn.addEventListener("click", e=> {
    createFormContainer.classList.add("active")
})
deleteAll.forEach(btn=> {
    btn.addEventListener("click", e=> {
        const table = e.target.parentElement.parentElement.parentElement
        table.querySelectorAll(".table-item").forEach(item=> {item.remove()})
        notesCounter()
    })
})


archiveAll.addEventListener("click", e=> {
    MainTable.querySelectorAll(".table-item").forEach(item=> {ArchiveTable.appendChild(item)})
    notesCounter()
})

desArchiveAll.addEventListener("click", e=> {
    ArchiveTable.querySelectorAll(".table-item").forEach(item=> {MainTable.appendChild(item)})
})

closeForm.addEventListener("click", e=> {
    e.preventDefault()
    e.parentElement.classList.remove("active")
})
createNoteForm.addEventListener("submit", e=> {
    e.preventDefault()
    const div = document.createElement("div")
    div.classList.add("table-item")
    const name = document.createElement("p")
    name.classList.add("note-name")
    name.innerHTML = nameInputCreate.value
    div.appendChild(name)
    const date = document.createElement("p")
    date.classList.add("note-date")
    date.innerHTML = new Date().toLocaleDateString()
    div.appendChild(date)
    const category = document.createElement("p")
    category.classList.add("note-category")
    category.innerHTML = categoryOptionsCreate.value
    div.appendChild(category)
    const content = document.createElement("p")
    content.classList.add("note-content")
    content.innerHTML = noteContentCreate.value
    div.appendChild(content)
    const dates = document.createElement("p")
    dates.classList.add("note-dates")
    dates.innerHTML = content.innerHTML.match(/\d{2}[./-]\d{2}[./-]\d{4}/g)
    div.appendChild(dates)
    const controls = document.createElement("div")
    controls.classList.add("controls")
    const editBtn = document.createElement("button")
    editBtn.innerHTML = "изменить"
    editBtn.classList.add("editBtn")
    controls.appendChild(editBtn)
    const archiveBtn = document.createElement("button")
    archiveBtn.innerHTML = "архив"
    archiveBtn.classList.add("archBtn")
    controls.appendChild(archiveBtn)
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "удалить"
    deleteBtn.classList.add("delBtn")
    controls.appendChild(deleteBtn)
    div.appendChild(controls)
    MainTable.appendChild(div)
    notesCounter()
})
MainTable.addEventListener("click", e=> {
    const target = e.target
    if(target.classList[0] === "delBtn") {
        target.parentElement.parentElement.remove()
        notesCounter()
    }   
    if(target.classList[0] === "archBtn") {
        ArchiveTable.appendChild(target.parentElement.parentElement)
        notesCounter()
    }
    if(target.classList[0] === "editBtn") {
        const div = target.parentElement.parentElement.childNodes
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
})
ArchiveTable.addEventListener("click", e=> {
    const target = e.target
    if(target.classList[0] === "delBtn")
        target.parentElement.parentElement.remove()
    if(target.classList[0] === "archBtn") {
        MainTable.appendChild(target.parentElement.parentElement)
        notesCounter()
    }
        
    if(target.classList[0] === "editBtn") {
        const div = target.parentElement.parentElement.childNodes
        nameInputEdit.value = div[0].innerHTML
        categoryOptionsEdit.value = div[2].innerHTML
        noteContentEdit.value = div[3].innerHTML
        editNoteBtn.addEventListener("click", e=> {
            e.preventDefault()
            div[0].innerHTML = nameInputEdit.value
            div[2].innerHTML = categoryOptionsEdit.value
            div[3].innerHTML = noteContentEdit.value
        })
    }
})
countBtn.addEventListener("click", notesCounter)

