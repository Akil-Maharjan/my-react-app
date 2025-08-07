


export const setUserToLocal = (user) =>{
    localStorage.setItem('user', JSON.stringify(user));
} 
export const getUserFromLocal = () =>{
    const user = localStorage.getItem('user');
    if(user){
        return JSON.parse(user);
    }
    return null;
}