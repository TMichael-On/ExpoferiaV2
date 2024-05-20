import bcrypt from "bcryptjs"

class helpers {
  async encryptPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async matchPassword(password, savedPassword){
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (e) {
      console.log(e)
    }
  }
}

export default helpers;