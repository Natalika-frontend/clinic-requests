import styled from "styled-components";
import { Form } from "../form/form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginContainer = ({className}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const requestFormFields = [
        { name: 'email', label: 'Электронная почта', type: 'email', required: true },
        { name: 'password', label: 'Пароль', type: 'password', required: true },
    ];

    const handleSubmit = async (data, resetForm) => {
        console.log("Отправляемые данные:", data); // Проверка данных
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email: data.email,
                password: data.password
            });
            console.log(response);
            console.log(response.data); // Проверка ответа от сервера
            resetForm();
            navigate('/');
        } catch (e) {
            setMessage("Ошибка при отправке формы");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={className}>
            <h1>Вход</h1>
            <div className="form-container">
                <Form
                    fields={requestFormFields}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
};

export const Login = styled(LoginContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & .form-container {
        border: 1px solid #000000;
        width: 550px;
        padding: 15px;
    }
`;
