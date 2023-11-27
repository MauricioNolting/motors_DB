const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database')


const Repairs = sequelize.define('Repair', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Repairs