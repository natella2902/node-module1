const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const pathNotes = path.join(__dirname, 'db.json')

async function addNote(title) {
const notes = require(pathNotes)
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(pathNotes, JSON.stringify(notes))
}

async function getNotes() {
    const notes = await fs.readFile(pathNotes, { encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
    const notes = await fs.readFile(pathNotes, { encoding: 'utf-8'});
    const newNotes = JSON.parse(notes).filter( note => (note.id == id))
    await fs.writeFile(pathNotes, JSON.stringify(newNotes))
}

module.exports = {
    addNote, getNotes, removeNote
}