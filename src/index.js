import express from 'express'
import morgan from 'morgan'
import '@babel/polyfill'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

import routes_projects from './routes/projects'
import routes_tasks from './routes/tasks'
app.use('/api/projects', routes_projects)
app.use('/api/tasks', routes_tasks)

const PORT = 4000
app.listen(PORT, ()=>{
    console.log(`Sv corriendo en puerto ${PORT}`)
})
export default app;