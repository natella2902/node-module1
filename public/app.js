document.addEventListener('click', event => {
    if(event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest("li").remove()
        })
    }

    if(event.target.dataset.type === "edit") {
        const id = event.target.dataset.id
        const data = event.target.closest("li").firstChild.nodeValue.trim()
        const title = prompt("Edit", data).trim()
        if(title) {
            edit({"id": id, "title": title}).then(() => {
                event.target.closest("li").firstChild.nodeValue = title
            })
        } else {
            alert("Field is required to fill in!")
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" })
}

async function edit(newNote) {
    await fetch(`/${newNote.id}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)})
}
