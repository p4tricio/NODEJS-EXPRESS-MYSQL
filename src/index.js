import app from './app.js'
import { PORT } from './config.js'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD,DB_DATABASE } from './config.js'

app.listen(PORT)

console.log('Server is listening on port ',PORT)
console.log('Conexión a la BD')
console.log('DB HOST: ',DB_HOST)
console.log('DB PORT: ',DB_PORT)
console.log('DB_USER: ',DB_USER)
console.log('DB_PASSWORD: ',DB_PASSWORD)
console.log('DB_DATABASE: ',DB_DATABASE)

