import { useRouter } from "next/router";
import RegisterForm from '../components/register/register-form';

function Register(props) {
    const router = useRouter();

    async function registerHandler(loginData) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        router.push('/login');
    }

    return <RegisterForm  onLogin={registerHandler} />
}

export default Register;