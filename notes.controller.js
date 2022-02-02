const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const pathNotes = path.join(__dirname, 'db.json')

async function saveNotes(data) {
    await fs.writeFile(pathNotes, JSON.stringify(data))
}

async function addNote(title) {
const notes = require(pathNotes)
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await saveNotes(notes)
}

async function getNotes() {
    const notes = await fs.readFile(pathNotes, { encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
    const notes = await getNotes()
    const newNotes = notes.filter( note => (note.id !== id))
    await saveNotes(newNotes)
}

async function editNote(payload) {
    const notes = await getNotes()
    const elIndex = notes.findIndex(note => note.id === payload.id)
    notes[elIndex] = payload
    await saveNotes(notes)
}

module.exports = {
    addNote, getNotes, removeNote, editNote
}