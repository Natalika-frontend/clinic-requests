import styled from "styled-components";
import { formatDate } from "../../utils/format-date";

const RequestsTablaContainer = ({className, requests}) => {

    return (
        <div className={className}>
            <h2>Заявки из формы</h2>
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th>Дата отправки</th>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th>Проблема</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request, index) => (
                    <tr key={index}>
                        <td>{formatDate(request.createdAt)}</td>
                        <td>{request.name}</td>
                        <td>{request.phone}</td>
                        <td>{request.problem}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export const RequestsTable = styled(RequestsTablaContainer)`
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & .table {
        border: 1px solid #000000;
        border-collapse: collapse;
        width: 100%;
        padding: 10px;
    }
    
    & .table-header {
        
    }

    .table th, .table td {
        border: 1px solid #000000;
        padding: 8px;
        text-align: center;
    }
`;
