import bcrypt from 'bcrypt';

export const encryptedPassword = async (password) => {
  //encripta 12 veces
  const salt = await bcrypt.genSalt(12);

  //hacemos esa encriptacion
  return await bcrypt.hash(password, salt);
};
