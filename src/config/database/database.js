const { Sequelize } = require('sequelize')
const { envs } = require('../enviroments/enviroments')
envs

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

const authenticated = async() => {
    try {
        await sequelize.authenticate();
        console.log("Conection has been established successfully :)")
    } catch (error) {
        console.log(error)
    }
}


const syncUp = async() => {
    try {
      await  sequelize.sync()
      console.log('conection has been synced succesfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sequelize,
    authenticated,
    syncUp
}