import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';

function LoginPage() {

    const user = useSelector(store => store.user);
    // if we get to registration...
    // const navigateTo = useNavigate();

    // if the user is already logged in, redirect to the projects page
    if (user.user_id) {
        return <Navigate to="/projects" />;
    }

    // if the user is not logged in, render the login form
    return (
        <div>
            <LoginForm />
        </div>
    );

}

export default LoginPage;