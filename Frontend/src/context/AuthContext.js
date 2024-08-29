//need to make token a context api


import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const fetchUser = async () => {
            try {
              const { data } = await axios.get('http://localhost:4500/api/user', { withCredentials: true });
              setUser(data.user);
            } catch (error) {
              console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    },[]);


    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}