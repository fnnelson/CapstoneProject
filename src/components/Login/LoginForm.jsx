import { useState } from 'react';
import { useDispatch } from 'react-redux';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const urlBase = 'http://localhost:3000'

    const login = async (event) => {
        event.preventDefault();

        // if user entered values into both username/password fields
        if (username && password) {
            let credentials = {
                username: username,
                password: password
            }

            try {
                const response = await fetch(`${urlBase}/api/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                if (response.ok) {
                    // only ok if username and password match a record of the user collection
                    const res = await response.json();
                    // obtaining user data ([0] since it's sent as an array), created object
                    let userData = {
                        user_id: res[0].user_id,
                        username: res[0].username,
                        role: res[0].role,
                    }
                    console.log('User successfully GOT the user!', userData);
                    // send user data to user reducer
                    dispatch({ type: 'SET_USER', payload: userData });
                } else {
                    console.error('You failed at signing in!');
                }
            } catch (error) {
                console.error('Error while sending data:', error);
            }



        } else {
            alert("type in your username and password!")
        }
    };

    return (
        <form className="login-form" onSubmit={login} >
            <h2 >Login</h2>
            <div>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        name="username"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <button type="submit" name="submit">
                    Log In
                </button>
            </div>
        </form>
    );
}

export default LoginForm;