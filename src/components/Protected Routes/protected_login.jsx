import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/router';
import React, {useEffect } from 'react';

const ProtectedLogin = ({children}) => {
    const router = useRouter()

    const {currentUser} = useUserStore()
    useEffect(() => {
        if (!currentUser) {
            router.push('/register?login=true')
        }
    
    }, [currentUser])
    return currentUser ? children : null
}
 
export default ProtectedLogin;