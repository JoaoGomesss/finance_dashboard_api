import 'dotenv/config.js'

import { app } from './src/app.js'

app.listen(process.env.PORT, () => {
    console.log(`Listenning on port: ${process.env.PORT}`)
})
