# Proyecto de API con Express y Sequelize

## Descripción

Backend de Nicolas Otondo y Mariana Otondo del trabajo final de Plataformas de Desarrollo con el profesor Gaitan.

## Estructura del Proyecto

- `middlewares/autenticar.js`: Middleware para autenticar y autorizar usuarios.
- `modelos/usuarios.js`: Modelo de Sequelize para los usuarios.
- `modelos/productos.js`: Modelo de Sequelize para los productos.
- `servidor.js`: Archivo principal que configura y ejecuta el servidor Express.

## Archivos

### `middlewares/autenticar.js`

```javascript
const jwt = require('jsonwebtoken');

const autenticar = (rolRequerido) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) return res.status(401).send('Acceso denegado');

        try {
            const tokenSinBearer = token.split(' ')[1]; // Remueve el prefijo "Bearer"
            const datos = jwt.verify(tokenSinBearer, 'secreto');
            req.usuario = datos;
            if (rolRequerido && req.usuario.rol !== rolRequerido) {
                return res.status(403).send('Acceso no autorizado');
            }
            next();
        } catch (error) {
            res.status(400).send('Token inválido');
        }
    };
};

module.exports = autenticar;
