import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get/accountlist');
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Pracownik</th>
                        <th>Nazwisko</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.first_name}</td>
                            <td><button className="btn btn-success">Edit</button > <button className="btn btn-error">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
