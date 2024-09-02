import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children})=>{ 
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [image, setImage] = useState(null);

    return (
        <UserContext.Provider value={{name, setName, email, setEmail, image, setImage }}>
            {children}
        </UserContext.Provider>
    )
}