const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('./database/config/config.json')[env];


const db = function(){
    
    let sequelize

    return {
        getInstance: function(){
        
            if (sequelize) return sequelize
            
            if (config.use_env_variable) {
                sequelize = new Sequelize(process.env[config.use_env_variable], config)
            } else {
                sequelize = new Sequelize(config.database, config.username, config.password, config)
            }
            return sequelize
        }
    }
}

module.exports = db()