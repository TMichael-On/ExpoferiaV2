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
}

export default helpers;