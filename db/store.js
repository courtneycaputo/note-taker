const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');
const { builtinModules } = require('module');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('.db/db/json', JSON.stringify(note))
    }

    getNotes (){
        return this.read().then((notes) => {
            let parseNotes;

            try {
                parsedNotes = [].concate(JSON.parse(notes))
            } catch(err) {
                parsedNotes = []
            }
            return parseNotes;
        })
    }

    addNotes (){
        const {title, text} = notes;
        if(!title || !text){
            throw new Error("Note title and text cannot be blank")
        }

        const newNote = {title, text, id: uuidv1()};
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }

    
}

modules.exports = new Store()