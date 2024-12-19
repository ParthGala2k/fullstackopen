const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
  console.log(`Successfully started server on port ${config.PORT}`)
})