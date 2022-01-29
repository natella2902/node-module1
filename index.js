const yargs = require('yargs')
const pkg = require('./package.json')
const { addNote, getNotes, removeNote } = require('./notes.controller')
const chalk = require("chalk");

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    handler({ title }) {
        addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all note in list',
    async handler() {
        const notes = await getNotes()
        console.log(chalk.blueBright('Here list of notes:'))
        notes.forEach((note)=> {
            console.log(chalk.bgCyan(note.id, note.title))
        })
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    async handler({id}) {
        await removeNote(id)
    }
})

yargs.parse()