import styled from "styled-components";
import { Input } from "../input/input";
import { useState } from "react";

const FormContainer = ({ className, fields, onSubmit, isSubmitting }) => {
    const [formState, setFormState] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {})
    );

    const handleChange = (e, name) => {
        setFormState({
            ...formState,
            [name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState, resetForm);
    };

    const resetForm = () => {
        setFormState(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {}));
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className="form-row">
                    <label>{field.label}</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            value={formState[field.name]}
                            onChange={(e) => handleChange(e, field.name)}
                            required={field.required}
                        />
                    ) : (
                        <Input
                            width="522px"
                            type={field.type}
                            value={formState[field.name]}
                            onChange={(e) => handleChange(e, field.name)}
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <div className="button-container">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
            </div>
        </form>
    );
};

export const Form = styled(FormContainer)`
    .form-row {
        margin-bottom: 10px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    & .form-row {
        width: 520px;
        margin-top: 20px;
    }
    
    textarea {
        width: 520px;
        height: 150px;
        border: 1px solid #000000;
        padding: 10px;
        font-size: 18px;
    }

    .button-container {
        text-align: center;
    }

    button {
        padding: 10px 20px;
        font-size: 18px;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        cursor: pointer;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;
