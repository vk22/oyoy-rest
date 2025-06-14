export const auth = async (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  const user = await getUserFromToken(token);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const canUpload = (user, pathname) => {
  if (user.role !== 'admin') {
    return false;
  }

  return true;
};
