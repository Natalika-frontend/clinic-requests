import styled from 'styled-components';
import { Input } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainContainer = ({ className }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        problem: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const cleanPhone = formData.phone.replace(/[^\d]/g, '');

        try {
            await axios.post('http://localhost:5000/api/requests', {
                name: formData.name,
                phone: cleanPhone,
                problem: formData.problem,
            });
            setFormData({
                name: '',
                phone: '',
                problem: '',
            });
            setSuccessMessage('Ваша заявка принята, мы перезвоним вам в ближайшее время!');
        } catch (e) {
            if (e.response && e.response.status === 409) {
                setErrorMessage('Пользователь уже существует');
            } else if (e.response && e.response.status === 400) {
                setErrorMessage('Неверный адрес электронной почты или пароль');
            } else {
                setErrorMessage('Ошибка при отправке формы');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={className}>
            <h1>Запись к врачу</h1>
            <form className="form-container" method="post" onSubmit={onSubmit}>
                <Input
                    title="ФИО"
                    type="text"
                    value={formData.name}
                    placeholder="Введите ваши имя, фамилию и отчество..."
                    onChange={handleChange}
                    name="name"
                    required={true}
                />
                <Input
                    title="Номер телефона"
                    type="tel"
                    value={formData.phone}
                    placeholder="Введите номер телефона..."
                    onChange={handleChange}
                    name="phone"
                    mask="phone"
                    required={true}
                />
                <div>
                    <label>Опишите вашу проблему</label>
                    <textarea
                        name="problem"
                        value={formData.problem}
                        onChange={handleChange}
                        placeholder="Опишите вашу проблему..."
                        required={false}
                    />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
        </div>
    );
};

export const Main = styled(MainContainer)`
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

    & textarea {
        width: 480px;
        height: 150px;
        padding: 15px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-size: 18px;
    }

    & .error-message {
        background-color: #9b4c4c;
        color: #ffffff;
        text-align: center;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    & .success-message {
        background-color: #2f8114;
        color: #ffffff;
        text-align: center;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    & button {
        width: 200px;
        padding: 5px;
    }
`;
