const { Router } = require('express')
const router = Router()
const { fork } = require('child_process')

router.get('/randoms', (req, res) => {
    const parametro = req.query.cant || 100000000
    const child = fork("./calculoFork.js")
    child.on('message', (msg) => {
        console.log(`Message from calculoFork.js: ${msg}`)
        if(msg === 'Ready'){
            child.send(parametro)
            return child.send('Start-task')
        }
        res.send(msg)
    })
})

module.exports = router