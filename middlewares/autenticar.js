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
