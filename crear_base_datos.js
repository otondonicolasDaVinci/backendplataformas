const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite:base_datos.sqlite');

const Producto = sequelize.define('Producto', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
    categoria: {type: DataTypes.STRING, allowNull: false},
    marca: {type: DataTypes.STRING, allowNull: false},
    precio: {type: DataTypes.FLOAT, allowNull: false},
    imagen: {type: DataTypes.STRING, allowNull: true},
    descripcion: {type: DataTypes.TEXT, allowNull: true},
    destacado: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
});

const cargarDatosIniciales = async () => {
    await sequelize.sync({force: true});

    const productos = [
        {
            id: 1,
            nombre: 'Teclado Logitech G213 Prodigy',
            categoria: 'Teclados',
            marca: 'Logitech',
            precio: 89799,
            imagen: 'teclado1.png',
            descripcion: 'La carcasa de G213 Prodigy es compacta, duradera, precisa y resistente a salpicaduras.',
            destacado: true
        },
        {
            id: 2,
            nombre: 'Teclado Logitech G Pro Edición League of Legends',
            categoria: 'Teclados',
            marca: 'Logitech',
            precio: 152799,
            imagen: 'teclado2.png',
            descripcion: 'Teclado mecánico sin teclado numérico, RGB LIGHTSYNC.',
            destacado: false
        },
        {
            id: 3,
            nombre: 'Teclado Logitech G915 LIGHTSPEED',
            categoria: 'Teclados',
            marca: 'Logitech',
            precio: 330399,
            imagen: 'teclado3.png',
            descripcion: 'Teclado inalámbrico mecánico con RGB LIGHTSYNC.',
            destacado: false
        },
        {
            id: 4,
            nombre: 'Mouse Logitech G502 Hero',
            categoria: 'Mouses',
            marca: 'Logitech',
            precio: 19999,
            imagen: 'mouse1.png',
            descripcion: 'Mouse ergonómico con sensor óptico HERO.',
            destacado: true
        },
        {
            id: 5,
            nombre: 'Auriculares Logitech G435',
            categoria: 'Audio',
            marca: 'Logitech',
            precio: 114199,
            imagen: 'audio1.png',
            descripcion: 'Auriculares inalámbricos con conectividad Bluetooth.',
            destacado: true
        },
        {
            id: 6,
            nombre: 'Auriculares Logitech G733',
            categoria: 'Audio',
            marca: 'Logitech',
            precio: 266999,
            imagen: 'audio2.png',
            descripcion: 'Auriculares con tecnología LIGHTSPEED y RGB LIGHTSYNC.',
            destacado: false
        },
        {
            id: 7,
            nombre: 'Auriculares Redragon Zeus X',
            categoria: 'Audio',
            marca: 'Redragon',
            precio: 139999,
            imagen: 'audio3.png',
            descripcion: 'Auriculares con retroiluminación RGB.',
            destacado: true
        },
        {
            id: 8,
            nombre: 'Mouse Logitech G PRO X',
            categoria: 'Mouses',
            marca: 'Logitech',
            precio: 79999,
            imagen: 'mouse2.png',
            descripcion: 'Mouse profesional con sensor de alta precisión.',
            destacado: false
        },
        {
            id: 9,
            nombre: 'Teclado Redragon Kumara K552',
            categoria: 'Teclados',
            marca: 'Redragon',
            precio: 53999,
            imagen: 'teclado4.png',
            descripcion: 'Teclado mecánico compacto y duradero.',
            destacado: true
        },
        {
            id: 10,
            nombre: 'Mouse Logitech G PRO LOL Edition',
            categoria: 'Mouses',
            marca: 'Logitech',
            precio: 129999,
            imagen: 'mouse3.png',
            descripcion: 'Mouse con diseño exclusivo League of Legends.',
            destacado: false
        }
    ];

    await Producto.bulkCreate(productos);
    console.log('Base de datos creada y datos iniciales cargados.');
};

cargarDatosIniciales();
