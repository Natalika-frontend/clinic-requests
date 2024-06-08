import styled from "styled-components";
import { Form } from "../form/form";
import axios from "axios";
import { useState } from "react";

const RequestFormContainer = ({ className }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const requestFormFields = [
        { name: 'fullName', label: 'ФИО', type: 'text', required: true },
        { name: 'phone', label: 'Номер телефона', type: 'phone', required: true },
        { name: 'problem', label: 'Опишите вашу проблему', type: 'textarea', required: false },
    ];

    const handleSubmit = async (data, resetForm) => {
        setIsSubmitting(true);
        setMessage("");

        try {
            await axios.post('http://localhost:5000/api/requests', {
                name: data.fullName,
                phone: data.phone,
                problem: data.problem
            });
            setMessage("Заявка принята!");
            resetForm();
        } catch (e) {
            setMessage("Ошибка при отправке формы");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={className}>
            <h1>Запись к врачу</h1>
            <div className="form-container">
                <Form
                    fields={requestFormFields}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export const RequestForm = styled(RequestFormContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & .form-container {
        width: 550px;
        border: 1px solid #000000;
        padding: 15px;
    }

    
    & button {
        width: 150px;
        height: 50px;
        margin-top: 10px;
        cursor: ${({ isSubmitting }) => (isSubmitting ? "not-allowed" : "pointer")};
        opacity: ${({ isSubmitting }) => (isSubmitting ? 0.5 : 1)};
    }
    //
    // & .message {
    //     background-color: coral;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     padding: 5px;
    //     margin-top: 10px;
    //     height: 50px;
    //     border: 1px solid #cf1414;
    // }
`;
