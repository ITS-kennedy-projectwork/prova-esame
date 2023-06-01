const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const dbFile = path.join(__dirname, '../../', 'database/officina.db')

const db = new sqlite3.Database(dbFile);

const router = express.Router()

router.get('/', (req, res) => {
    db.serialize(() => {
        db.all('SELECT ROWID,* FROM meccanici', (err, rows) => {
            if (err) {
                console.error(err)
                return res.send('errore lettura meccanici')
            }

            return res.send(rows)
        })
    })
})

router.get('/:id', (req, res) => {
    // const id = req.params.id
    const {id} = req.params

    db.serialize(() => {
        db.get(`SELECT ROWID,* FROM meccanici WHERE ROWID = ${id}`, (err, row) => {
            if (err) {
                console.error(err)
                return res.send('errore lettura meccanico')
            }

            return res.send(row)
        })
    })
})

router.post('/', (req, res) => {
    const {nome, cognome, eta} = req.body

    db.serialize(() => {
        db.run(
            `INSERT INTO meccanici ("nome", "cognome", "eta") VALUES ($nome, $cognome, $eta)`, 
            {
                $nome: nome,
                $cognome: cognome,
                $eta: eta
            },
            (err) => {
                if (err) {
                    console.error(err)
                    return res.send('errore creazione meccanico')
                }

                return res.send(`creato meccanico`)
            }
        )
    })

    /*res.send({
        "name": "Pippo",
        "cognome": "Pluto",
        "age": 50
    })*/
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {nome, cognome, eta} = req.body

    db.serialize(() => {
        db.run(
            `UPDATE meccanici SET nome=$nome, cognome=$cognome, eta=$eta WHERE ROWID = ${id}`, 
            {
                $nome: nome,
                $cognome: cognome,
                $eta: eta
            },
            (err) => {
                if (err) {
                    console.error(err)
                    return res.send('errore modifica meccanico')
                }

                return res.send(`modificato meccanico`)
            }
        )
    })
    /*res.send({
        "name": "Pippo",
        "cognome": "Pluto",
        "age": 50
    })*/
})

router.patch('/:id', (req, res) => {
    const {id} = req.params
    const {nome, cognome, eta} = req.body

    let campi = []

    if (nome && nome !== '') {
        campi.push('nome=$nome')
    }

    if (cognome && cognome !== '') {
        campi.push('cognome=$cognome')
    }

    if (eta && eta !== '') {
        campi.push('eta=$eta')
    }

    db.serialize(() => {
        db.run(
            `UPDATE meccanici SET ${campi.join(',')} WHERE ROWID = ${id}`, 
            {
                $nome: nome,
                $cognome: cognome,
                $eta: eta
            },
            (err) => {
                if (err) {
                    console.error(err)
                    return res.send('errore modifica meccanico')
                }

                return res.send(`modificato meccanico`)
            }
        )
    })
    /*res.send({
        "name": "Pippo",
        "cognome": "Pluto",
        "age": 50
    })*/
})

router.delete('/:id', (req, res) => {
    // const id = req.params.id
    const {id} = req.params

    db.serialize(() => {
        db.run(`DELETE FROM meccanici WHERE ROWID = ${id}`, (err, row) => {
            if (err) {
                console.error(err)
                return res.send('errore lettura meccanico')
            }

            return res.send(`elimino singolo meccanico ${id}`)
        })
    })
})


module.exports = router