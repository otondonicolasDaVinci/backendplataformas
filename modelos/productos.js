const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:base_datos.sqlite');

const Producto = sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
    marca: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    destacado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
});

sequelize.sync();
module.exports = Producto;
