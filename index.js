const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();
// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
 origin: function (origin, callback) {
 if (whitelist.includes(origin)) {
// Puede consultar la API
 callback(null, true);
} else {
 // No esta permitido
 callback(new Error("Error de Cors"));
 }
},
};



// habilitar cors
app.use(cors(corsOptions));
// app.use(cors());

// conectar la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({ extend: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});