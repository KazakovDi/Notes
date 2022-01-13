
const countTable = document.querySelector("#count-table")
export const MainTable = document.querySelector("#main-table")
export const ArchiveTable = document.querySelector("#archive-table")
const formContainer = document.querySelector("#formContainer")


import {fastCreate} from "/scripts/app.js"

function getUniques(items, arr) {
    items.forEach(item=> {
        const elements = [...item.childNodes]
        const mapedElements = elements.map(element=> element.innerHTML)
        arr.push(mapedElements[2])
    })
    return new Set(arr)
}
export function showForm(form) {
    formContainer.classList.add("active")
    form.classList.add("active")
}
export function notesCounter() {
    const items = countTable.querySelectorAll(".table-item")
    items.forEach(item=> item.remove())
    const Activeitems = MainTable.querySelectorAll(".table-item")
    const Architems = ArchiveTable.querySelectorAll(".table-item")
    const massActive=[]
    const massArchive=[]
    const newSet = getUniques(Activeitems, massActive)
    const archiveSet = getUniques(Architems, massArchive)
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
