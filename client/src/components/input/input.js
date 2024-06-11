import styled from "styled-components";

const InputContainer = ({ className, title, type, value, placeholder, onChange, name, mask }) => {
    const formatPhoneNumber = (value) => {
        const cleaned = ('' + value).replace(/\D/g, '');

        let formattedValue = '+';

        if (cleaned.length > 0) {
            formattedValue += cleaned[0];
        }

        if (cleaned.length > 1) {
            formattedValue += ` (${cleaned.substring(1, 4)}`;
        }

        if (cleaned.length > 4) {
            formattedValue += `) ${cleaned.substring(4, 7)}`;
        }

        if (cleaned.length > 7) {
            formattedValue += `-${cleaned.substring(7, 9)}`;
        }

        if (cleaned.length > 9) {
            formattedValue += `-${cleaned.substring(9, 11)}`;
        }

        return formattedValue;
    };

    const handleInputChange = (e) => {
        const rawValue = e.target.value;
        let formattedValue = rawValue;

        if (mask === 'phone') {
            formattedValue = formatPhoneNumber(rawValue.replace(/\D/g, ''));
        }

        const event = {
            ...e,
            target: {
                ...e.target,
                name: name,
                value: formattedValue,
            },
        };

        onChange(event);
    };

    return (
        <div className={className}>
            <label>{title}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                name={name}
                required
            />
        </div>
    );
};

export const Input = styled(InputContainer)`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    label {
        margin-bottom: 5px;
    }

    input {
        width: 480px;
        height: 20px;
        padding: 10px;
        border: 1px solid #000000;
        font-size: 16px;
        border-radius: 4px;
        margin-bottom: 10px;
    }
`;
