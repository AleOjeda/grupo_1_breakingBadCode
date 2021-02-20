// Requiero FileSystem para movimientos con archivos.
// Requiero Path para las direcciónes
const fs = require('fs');
const path = require('path');

let model = function(tableName) {
    return {
        //Ruta del archivo + nombre de la tabla json como parametro
        filePath: path.join(__dirname, '../database/' + tableName + '.json'),

        readFile() {
            //diferencia entre readFileSync y readFile 
            //https://stackoverflow.com/questions/17604866/difference-between-readfile-and-readfilesync
            // Sync bloquea la ejecución del resto, esta Ok en este lado si no no va a retornar nada.
            let fileContents = fs.readFileSync(this.filePath, 'utf-8');
            if(fileContents){
                return JSON.parse(fileContents)
            }
            return [];
        },
        writeFile(contents){
            //armo contenido listo para sobreescribir json actual, parametros de stringify
            //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/JSON/stringify
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents)
        },
        nextId () {
            let rows = this.readFile();
            let lastRow = rows.pop();
            if(lastRow) {
                return ++lastRow.id;
            }
            return 1;
        },
        create (row) {
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);
            this.writeFile(rows);
            return row.id;
        },
        find(id){
            let rows = this.readFile();
            return rows.find( row => row.id == id);
        },
        //Find con key parametro
        findKeyValue(key,value){
            let rows = this.readFile();
            return rows.find( row => row[key] == value);
        },
        update(row){
            //Recorre todos los IDs, no busca solo 1.
            let rows = this.readFile();
            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    console.log('llegue a la luna');
                    return row;
                }
                console.log('llegue a la luna', row);
                return oneRow;
            });

            this.writeFile(updatedRows);

            return row.id;
        }






    }
};

module.exports = model;


