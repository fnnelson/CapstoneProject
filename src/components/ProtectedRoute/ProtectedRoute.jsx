import { Route } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';
import { useSelector } from 'react-redux';

// Responsible for watching redux state, and returning component based on log-in status

function ProtectedRoute({ component, children, ...props }) {
    const user = useSelector((store) => store.user);

    // Component may be passed in as a "component" prop, or as a child component.
    const ProtectedComponent = component || (() => children);

    // We return a Route component that gets added to our list of routes
    return (
        <Route
            // all props like 'exact' and 'path' that were passed in
            // are now passed along to the 'Route' Component
            {...props}
        >
            {user.user_id ?
                // If the user is logged in, show the protected component
                <ProtectedComponent />
                :
                // Otherwise, redirect to the Login Page
                <LoginPage />
            }
        </Route>

    );
}

export default ProtectedRoute;