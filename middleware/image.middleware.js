import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imagenes/'); // Define la carpeta donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define el nombre de archivo para evitar colisiones
    }
});

export const upload = multer({ storage });