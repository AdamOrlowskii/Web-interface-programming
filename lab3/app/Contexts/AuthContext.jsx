import { createContext, useContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.error("Error in auth state change:", error);
            setError(error);
            setLoading(false);
        }
    }, []);

    const signInWithGoogle = async () => {
        try {
            setError(null);
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError(error);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            setError(error);
        }
    };

    const value = {
        user,
        loading,
        error,
        signInWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 