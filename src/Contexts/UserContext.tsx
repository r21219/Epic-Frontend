import React, {createContext, useState} from 'react';
import User from "../models/User";

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    login: () => {
    },
    logout: () => {
    },
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};
