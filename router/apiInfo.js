const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    const data = {
        'carpetaProyecto':process.cwd(),
        'idProceso':process.pid,
        'versionNode':process.version,
        'tituloProceso':process.title,
        'sistemaOperativo':process.platform,
        'directorioEjecucion':process.execPath,
        'rss':JSON.stringify(process.memoryUsage.rss(), null, 2)
    }
    res.render("info", data)
})

module.exports = router