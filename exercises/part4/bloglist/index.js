const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
  logger.info(`Successfully started server on port ${config.PORT}`)
})