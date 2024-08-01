import { getStorageItem } from "@/lib/storage";
import { router } from "expo-router";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext<any>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                            setUser(res);
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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
