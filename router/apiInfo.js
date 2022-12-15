const { Router } = require('express')
const router = Router()
const os = require('os')
const compression = require('compression')

router.get('/',compression(), (req, res) => {
    const data = {
        'carpetaProyecto':process.cwd(),
        'idProceso':process.pid,
        'versionNode':process.version,
        'tituloProceso':process.title,
        'sistemaOperativo':process.platform,
        'directorioEjecucion':process.execPath,
        'rss':JSON.stringify(process.memoryUsage.rss(), null, 2),
        'numProcesadores':os.cpus().length
    }
    res.render("info", data)
})

module.exports = router