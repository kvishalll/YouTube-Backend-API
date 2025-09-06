import { Link } from 'react-router-dom';
const Welcome = () => {
    return (
        <>
            <h2>Welcome page</h2>
            <Link to="/login">Login Page</Link> <br />
            <Link to="/register">Register Page</Link>
        </>
    )
}

export default Welcome;