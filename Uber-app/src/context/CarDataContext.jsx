import { createContext, useContext, useEffect, useState } from "react";

const CarContext = createContext();

//custom hook
export const useCarContext =  ()=> useContext(CarContext);

//provider
export const CarProvider = ({children})=>{
    const [car, setCar] = useState([]);

    const getProducts = async () => {
        const res = await fetch(`http://localhost:3000/products`);
        const data = await res.json();
        setCar(data);
      };
      useEffect(() => {
        getProducts();
      }, [])
    
    return (
        <CarContext.Provider value={{car}}>
            {children}
        </CarContext.Provider>
    );
}
