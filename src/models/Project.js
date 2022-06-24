import Sequelize from 'sequelize'
import { connector } from '../database/database.js'
import Task from './Task'

const Project = connector.define('projects', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        type: Sequelize.TEXT
    },
    priority: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.TEXT
    },
    deliverydate:{
        type: Sequelize.DATE
    }
}, {
    timestamps: false
})

Project.hasMany(Task, {
    foreignKey: 'projectid',
    sourceKey: 'id'
})

Task.belongsTo(Project, {
    as: 'alias-project',
    foreignKey: 'projectid',
    sourceKey: 'id'
})

export default Project