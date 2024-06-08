import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const RequestsTableContainer = ({className}) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/requests');
                setRequests(response.data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchRequests();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            const parts = dateString.split('.');
            if (parts.length === 3) {
                const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                if (!isNaN(formattedDate)) {
                    return formattedDate.toLocaleDateString('ru-RU');
                }
            }
            return "Invalid Date";
        }
        return date.toLocaleDateString('ru-RU');
    };

    return (
        <div className={className}>
            <h1>Заявки из формы</h1>
            <table>
                <thead>
                <tr>
                    <th className="table-header-cell">Дата отправки</th>
                    <th className="table-header-cell">ФИО</th>
                    <th className="table-header-cell">Телефон</th>
                    <th className="table-header-cell">Проблема</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request, index) => (
                    <tr key={request.id || index}>
                        <td className="date-column">{formatDate(request.createdAt)}</td>
                        <td>{request.name}</td>
                        <td>{request.phone}</td>
                        <td>{request.problem}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export const RequestsTable = styled(RequestsTableContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    table {
        width: 800px;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
    
    & .date-column {
        text-align: end;
    }
    
    & .table-header-cell {
        height: 50px;
        text-align: center;
    }
`;
