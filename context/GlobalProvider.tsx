import { getStorageItem } from "@/lib/storage";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext<any>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hospitals, setHospitals] = useState(null);
    const [hospital, setHospital] = useState();
    const [serviceTypes, setServiceTypes] = useState(null);

    useEffect(() => {
        getStorageItem("token")
            .then((res) => {
                if (res) {
                    // Check if token has expired
                    // checkToken(res).then((res) => {
                    //     if (res) {
                    //         setIsLoggedIn(true)
                    //     } else {
                    //         router.replace("/sign-in")
                    //     }
                    // })
                    setIsLoggedIn(true);
                    getStorageItem("userInfo")
                        .then((res) => {
                            setUser(JSON.parse(res));
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                hospitals,
                setHospitals,
                hospital,
                setHospital,
                serviceTypes,
                setServiceTypes,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
