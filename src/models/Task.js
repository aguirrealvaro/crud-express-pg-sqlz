import Sequelize from 'sequelize'
import Project from './Project'
import { connector } from '../database/database.js'

const Task = connector.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        type: Sequelize.TEXT
    },
    done: {
        type: Sequelize.BOOLEAN
    },
    projectid: {
        type: Sequelize.INTEGER,
        /* model: Project,
        key: 'id' */
    }
}, {
    timestamps: false
})

export default Task