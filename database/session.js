import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import pool from './conection-db.js';

const MySQLStoreWithSession = MySQLStore(session);

// Configuración de express-mysql-session
const sessionStore = new MySQLStoreWithSession({
  expiration: 60 * 60 * 1000, // Tiempo de expiración de la sesión (en milisegundos)
  createDatabaseTable: true, // Crear tabla de sesiones si no existe
}, pool);

// Configuración de la sesión de Express
const sessionMiddleware = session({
  secret: 'faztmysqlnodemysql22', // Secreto para firmar la sesión
  resave: false,
  saveUninitialized: false,
  store: sessionStore
});

export default sessionMiddleware;
