import { useNavigate } from 'react-router-dom';

export const Logout = (props) => {
    props.setLogged(false)
    props.setUser("")
    const navigate = useNavigate();
    navigate('/login');
    return (null)
}