const express = require('express')
const qrcode = require('qrcode')

const meccaniciRouter = require('./router/meccanici')
const autoRouter = require('./router/auto')

const port = 3000

const app = express()

app.use(express.json())

app.use('/manuali', express.static('download'))

app.use('/meccanici', meccaniciRouter)
app.use('/auto', autoRouter)

app.get('/condividi', (req, res) => {
    qrcode.toDataURL(`http://localhost:${port}/meccanici`, (err, url) => {
        if(err) {
            return res.send('Errore generando il QRCode')
        }

        res.send(`<img src="${url}" />`)
    })
})

app.listen(port, ()=> {
    console.log(`Server avviato su http://localhost:${port}`)
})