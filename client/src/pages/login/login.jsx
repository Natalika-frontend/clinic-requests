import styled from "styled-components";
import { Button, Input } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = ({className, setIsLoggedIn}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setErrorMessage('');
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: formData.email,
                password: formData.password,
            });
            setFormData({
                email: '',
                password: ''
            });
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', response.data.role);
            navigate("/");
        } catch (e) {
            console.log(e.response.data);
            setErrorMessage("Ошибка при отправке формы");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={className}>
            <h1>Вход</h1>
            <form className="form-container" method="post" onSubmit={onSubmit}>
                <Input
                    title="Электронная почта"
                    type="email"
                    value={formData.email}
                    placeholder="Введите ваш email..."
                    onChange={handleChange}
                    name="email"
                    required={true}
                />
                <Input
                    title="Пароль"
                    type="password"
                    value={formData.password}
                    placeholder="Введите пароль..."
                    onChange={handleChange}
                    name="password"
                    required={true}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <Button type="submit" width="200px" disabled={isSubmitting}>
                    {isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
            </form>
        </div>
    );
};

export const Login = styled(LoginContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & .form-container {
        width: 500px;
        display: flex;
        flex-direction: column;
        padding: 25px;
        border: 1px solid #000000;
        align-items: center;
    }

    & .error-message {
        background-color: #9b4c4c;
        color: #ffffff;
        text-align: center;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;
