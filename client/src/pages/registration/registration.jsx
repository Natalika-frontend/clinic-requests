import styled from "styled-components";
import { Button, Input } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationContainer = ({className}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { email, password, repeatPassword } = formData;

        if (!email || !password || !repeatPassword) {
            setErrorMessage('Все поля обязательны для заполнения');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Некорректный email. Введите почту в формате: yorPostAddress@mail.ru');
            return false;
        }

        if (password.length < 3 || password.length > 8) {
            setErrorMessage('Пароль должен содержать от 3 до 8 символов');
            return false;
        }

        if (password !== repeatPassword) {
            setErrorMessage('Пароли должны совпадать');
            return false;
        }

        return true;
    };

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/registration', {
                email: formData.email,
                password: formData.password
            });
            setFormData({
                email: '',
                password: '',
                repeatPassword: '',
            });
        } catch (e) {
            if (e.response && e.response.status === 409) {
                setErrorMessage('Пользователь c таким email уже существует');
            } else {
                setErrorMessage('Ошибка при отправке формы');
            }
        } finally {
            setIsSubmitting(false);
            navigate('/login');
        }
    };

    return (
        <div className={className}>
            <h1>Регистрация</h1>
            <form className="form-container" method="post" onSubmit={onSubmit}>
                <Input
                    title="Электронная почта"
                    type="email"
                    value={formData.name}
                    placeholder="Введите ваш email..."
                    onChange={handleChange}
                    name="email"
                    required={true}
                />
                <Input
                    title="Пароль"
                    type="password"
                    value={formData.phone}
                    placeholder="Введите пароль..."
                    onChange={handleChange}
                    name="password"
                    required={true}
                />
                <Input
                    title="Повтор пароля"
                    type="password"
                    value={formData.repeatPassword}
                    placeholder="Повторите введенный пароль..."
                    onChange={handleChange}
                    name="repeatPassword"
                    required={true}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
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
