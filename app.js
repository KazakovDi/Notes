
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
function fastCreate(parent, element, content, className) {
    const newElement = document.createElement(element)
    newElement.innerHTML = content
    if(className !== undefined) {
        newElement.classList.add(className)
    }
    parent.appendChild(newElement)
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
        const auxArray=[
            elem, 
            massActive.filter(item => item === elem).length,
            massArchive.filter(item => item === elem).length,
        ]
        auxArray.forEach(item=> {
            fastCreate(div, "p", item)
        })
        countTable.appendChild(div)
    } 
}
function itemControls(e,table, oppositeTable) {
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
}
// variables ===============
    // tables
    const MainTable = document.querySelector("#main-table")
    const ArchiveTable = document.querySelector("#archive-table")
    const countTable = document.querySelector("#count-table")

    const deleteAll = document.querySelectorAll(".deleteAll")
    const archiveAll = document.querySelectorAll(".archiveAll") 
    // forms
    const formContainer = document.querySelector("#formContainer")
    const createNoteForm = document.querySelector("#createNoteForm")
    const forms = document.querySelectorAll(".form")
    // forms variables
    const editForm = document.querySelector("#editForm")
    const showNoteFormBtn = document.querySelector("#showNoteForm")
    const nameInputCreate = createNoteForm.querySelector("input[name=name")
    const noteContentCreate = createNoteForm.querySelector("textarea")
    const categoryOptionsCreate = createNoteForm.querySelector("select")

    const nameInputEdit = editForm.querySelector("input[name=name")
    const noteContentEdit = editForm.querySelector("textarea")
    const categoryOptionsEdit = editForm.querySelector("select")
    const editNoteBtn = editForm.querySelector("#editNote")
    const createNoteBtn = document.querySelector("#createNote")
    const closeForm = document.querySelectorAll(".closeForm")
// eventListeners
showNoteFormBtn.addEventListener("click", ()=> showForm(createNoteForm))
closeForm.forEach(btn=> {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        btn.parentElement.classList.remove("active")
    })
})

createNoteForm.addEventListener("submit", e=> {
    e.preventDefault()
    const div = document.createElement("div")
    div.classList.add("table-item")
    const auxArray=[
                    nameInputCreate.value, 
                    new Date().toLocaleDateString(),
                    categoryOptionsCreate.value,
                    noteContentCreate.value,
                    noteContentCreate.value.match(/\d{2}[./-]\d{2}[./-]\d{4}/g)
                ]
    auxArray.forEach(item=> {
        fastCreate(div, "p", item)
    })
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