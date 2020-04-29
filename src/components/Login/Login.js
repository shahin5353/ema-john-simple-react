import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () =>{
        auth.signInWithGoogle()
        .then(res =>{
            window.location.pathname = '/review';       
        })
    }
    const handleSignOut = () =>{
        auth.signOut()
        .then(res =>{
            window.location.pathname = '/';        
        })
    }

    return (
        <div>
            <h1>Login Here</h1>
            {
                auth.user 
                ? 
                <div>
                    <h1>{auth.user.name}</h1>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
                :
                <button onClick={handleSignIn}>Login with google</button>

            }
        </div>
    );
};

export default Login;