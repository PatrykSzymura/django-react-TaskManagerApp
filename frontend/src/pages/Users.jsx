import React, { useEffect, useState } from 'react';
import { getUserList } from '../utils/dataFeches';
import axiosInstance from '../utils/axiosInstance';
import { FaCog } from "react-icons/fa";
import Modal from "../components/Modal";
import EditUser from "./forms/EditUser"; // Poprawiony import

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Dodanie stanu modala
    const [selectedUser, setSelectedUser] = useState(null); // Dodanie stanu wybranego użytkownika

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUserList();
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axiosInstance.delete(`/api/delete/user/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditSuccess = async () => {
        try {
            const response = await getUserList();
            setUsers(response.data);
            setShowModal(false); // Zamknięcie modala po sukcesie edycji
        } catch (error) {
            setError(error.message);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

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
                            <td>
                                {/* <button className="btn btn-base-200 text-2xl mr-2" onClick={() => openModal(user)}>
                                    <FaCog />
                                </button> */}
                                <button className="btn btn-error" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && selectedUser && (
                <Modal
                    element={<EditUser user={selectedUser} onSuccess={handleEditSuccess} />}
                    btn_Name={null}
                    btn_Style={null}
                    modal_ID={`Edit-${selectedUser.id}`}
                />
            )}
        </div>
    );
};

export default UserList;
