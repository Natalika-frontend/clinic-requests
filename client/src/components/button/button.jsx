import styled from "styled-components";

const ButtonContainer = ({className, children, onClick, type}) => {
    return (
        <button className={className} onClick={onClick} type={type}>{children}</button>
    );
};

export const Button = styled(ButtonContainer)`
        width: ${(props) => props.width};
        padding: 5px;
        font-size: 16px;
`;
