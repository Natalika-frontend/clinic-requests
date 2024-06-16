import styled from 'styled-components';
import { Button, Input, RequestsTable } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MainContainer = ({className, isLoggedIn, setIsLoggedIn}) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        problem: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setErrorMessage('');
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/requests', {
                withCredentials: true
            });
            setRequests(response.data);
        } catch (error) {
            console.error("Ошибка при получении заявок:", error);
        }
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem('isLoggedIn') === 'true';
        const role = localStorage.getItem('userRole') || '';
        setIsLoggedIn(loggedInUser);
        setUserRole(role);
        if (loggedInUser && role === 'ADMIN') {
            fetchRequests();
        }
    }, [setIsLoggedIn, setUserRole]);

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const cleanPhone = formData.phone.replace(/[^\d]/g, '');

        try {
            await axios.post('http://localhost:5000/requests', {
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
            setErrorMessage("Ошибка при отправке формы");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, {
                withCredentials: true
            });
            setIsLoggedIn(false);
            setUserRole('');
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('userRole')
            navigate('/');
        } catch (error) {
            console.error("Ошибка при выходе из системы:", error);
        }
    };

    return (
        <div className={className}>
            {isLoggedIn ? (
                <div className="buttons-container">
                    <Button onClick={handleLogout}>Выйти</Button>
                </div>
            ) : (
                <div className="buttons-container">
                    <Button onClick={() => navigate('/login')}>Войти</Button>
                    <Button onClick={() => navigate('/registration')}>Зарегистрироваться</Button>
                </div>
            )}
            {userRole === 'ADMIN' ? (
                <RequestsTable requests={requests}/>
            ) : (
                <>
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
                        <Button type="submit" width="200px" disabled={isSubmitting}>
                            {isSubmitting ? 'Отправка...' : 'Отправить'}
                        </Button>
                    </form>
                </>
            )
            }
        </div>
    )
        ;
};

export const Main = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & .buttons-container {
        display: flex;
        width: 600px;
        justify-content: flex-end;
        margin-top: 30px;

        & button {
            margin-left: 15px;
        }
    }

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
`;
