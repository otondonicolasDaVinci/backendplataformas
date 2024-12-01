const express = require('express');
const cors = require('cors');
const app = express();
const autenticar = require('./middlewares/autenticar');


app.use(cors());
app.use(express.json());


const Producto = require('./modelos/productos');


app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});


app.post('/productos', autenticar('administrador'), async (req, res) => {
    const {nombre, categoria, marca, precio, imagen, descripcion, destacado} = req.body;
    try {
        const nuevoProducto = await Producto.create({
            nombre,
            categoria,
            marca,
            precio,
            imagen,
            descripcion,
            destacado
        });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error al crear el producto');
    }
});

app.delete('/productos/:id', autenticar('administrador'), async (req, res) => {
    const {id} = req.params;
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        await producto.destroy();
        res.status(200).send(`Producto con ID ${id} eliminado`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
});

app.put('/productos/:id', autenticar('administrador'), async (req, res) => {
    const {id} = req.params;
    const {nombre, categoria, marca, precio, imagen, descripcion, destacado} = req.body;
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        producto.nombre = nombre || producto.nombre;
        producto.categoria = categoria || producto.categoria;
        producto.marca = marca || producto.marca;
        producto.precio = precio || producto.precio;
        producto.imagen = imagen || producto.imagen;
        producto.descripcion = descripcion || producto.descripcion;
        producto.destacado = destacado !== undefined ? destacado : producto.destacado;
        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
});


// USUARIOS

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./modelos/usuarios');

app.post('/usuarios/registro', async (req, res) => {
    console.log('Solicitud recibida en /usuarios/registro');
    console.log('Datos enviados:', req.body);

    const { nombre, correo, contraseña, rol } = req.body;

    try {
        const hashContraseña = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = await Usuario.create({ nombre, correo, contraseña: hashContraseña, rol });
        console.log('Usuario creado:', nuevoUsuario);
        res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message || error);
        res.status(400).send('Error al registrar usuario');
    }
});




app.post('/usuarios/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        console.log('Datos recibidos en req.body:', req.body);

        const usuario = await Usuario.findOne({ where: { correo } });

        console.log('Usuario:', usuario);
        console.log('Contraseña proporcionada:', contraseña);
        console.log('Contraseña en BD:', usuario ? usuario.contraseña : 'No hay usuario');

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ token, rol: usuario.rol });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
});

app.get('/usuarios', autenticar('administrador'), async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'correo', 'rol', 'createdAt', 'updatedAt'],
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

app.put('/usuarios/:id', autenticar('administrador'), async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña, rol } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).send('Usuario no encontrado');

        if (contraseña) {
            const hashContraseña = await bcrypt.hash(contraseña, 10);
            usuario.contraseña = hashContraseña;
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.correo = correo || usuario.correo;
        usuario.rol = rol || usuario.rol;

        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar usuario');
    }
});

app.delete('/usuarios/:id', autenticar('administrador'), async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).send('Usuario no encontrado');

        await usuario.destroy();
        res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error al eliminar usuario');
    }
});





app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
