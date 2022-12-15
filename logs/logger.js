const winston = require('winston')

let logger // Levels: Silly, Debug, Verbose, Info, Warn, Error

logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: './logs/errors.log', level: 'error' })
    ]
})

module.exports = logger