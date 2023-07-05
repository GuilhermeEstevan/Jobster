import { useContext, createContext, useState } from "react";
import { toast } from 'react-toastify'
import customFetch from "../../Utils/Axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../Utils/LocalStorage";

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(getUserFromLocalStorage())
    const [isLoading, setIsloading] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const registerUser = async (user) => {
        try {
            setIsloading(true)
            const response = await customFetch.post('/auth/testingRegister', user)
            const newUser = response.data.user
            setUser(newUser)
            addUserToLocalStorage(newUser)
            setIsloading(false)
            toast.success(`Hello there ${newUser.name}`)
        } catch (error) {
            setIsloading(false)
            toast.error(error.response.data.msg)
        }
    }
    const loginUser = async (user) => {
        try {
            setIsloading(true)
            const response = await customFetch.post('/auth/login', user)
            const newUser = response.data.user
            setUser(newUser)
            addUserToLocalStorage(newUser)
            setIsloading(false)
            toast.success(`Welcome back ${newUser.name}`)
        } catch (error) {
            setIsloading(false)
            toast.error(error.response.data.msg)
        }
    }
    const logoutUser = (message) => {
        setUser(null)
        setIsSidebarOpen(false)
        removeUserFromLocalStorage()
        if (message) {
            toast.success(message)
        }
    }
    const updateUser = async (newUser) => {
        try {
            const token = user.token
            setIsloading(true)
            const response = await customFetch.patch('/auth/updateUser', newUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(response);
            setUser(response.data.user)
            addUserToLocalStorage(response.data.user)
            setIsloading(false)
            toast.success('User updated!')
        } catch (error) {
            setIsloading(false)
            checkForUnauthorizedResponse(error)
            toast.error(error.response.data.msg)
        }
    }



    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const checkForUnauthorizedResponse = (error) => {
        if (error.response.status === 401) {
            logoutUser()
            toast.error('Unauthorized! Logging Out...')
            return true
        }
        return false
    }

    return (
        <UserContext.Provider value={{
            user,
            isLoading,
            loginUser,
            registerUser,
            isSidebarOpen,
            toggleSidebar,
            logoutUser,
            updateUser,
            checkForUnauthorizedResponse
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}