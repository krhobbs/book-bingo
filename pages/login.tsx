import { useRouter } from "next/router";
import LoginForm from '../components/login/login-form';

function Login(props) {
    const router = useRouter();

    async function loginHandler(loginData) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        router.push('/');
    }

    return <LoginForm  onLogin={loginHandler} />
}

export default Login;