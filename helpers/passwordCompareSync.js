import bcrypt from 'bcryptjs';

export const passwordCompareSync =(normalPass,hashedPass) => {
  return bcrypt.compareSync(normalPass,hashedPass)
}
