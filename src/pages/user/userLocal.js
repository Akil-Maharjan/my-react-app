// features/user/local/local.js
export const setUsersToLocal = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUsersFromLocal = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : null;
};

export const clearUsersFromLocal = () => {
  localStorage.removeItem('users');
};