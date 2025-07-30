
export const saveAuthData = (token, user) => {
    /*
    Function to save authentication data in local storage.
    It stores the token and user information for later use in the application.
    */
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
