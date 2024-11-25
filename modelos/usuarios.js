const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:base_datos.sqlite');

const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: 'usuario' }
});

sequelize.sync();
module.exports = Usuario;
