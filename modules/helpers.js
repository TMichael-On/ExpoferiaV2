import bcrypt from "bcryptjs"
import fs from 'fs';
// await bcrypt.hash(password, 10)
class helpers {
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async matchPassword(password, savedPassword) {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (e) {
      console.log(e)
    }
  }

  guardarImagen(archivo, destino) {
    return new Promise((resolve, reject) => {
      fs.writeFile(destino, archivo.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  eliminarImagen(img_nombre) {  
    const destino = 'public/imagenes/' + img_nombre;

    return new Promise((resolve, reject) => {
      fs.unlink(destino, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
  }
}

export default helpers;