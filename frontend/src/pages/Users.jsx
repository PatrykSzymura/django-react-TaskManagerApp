import React, { useEffect, useState } from 'react';
import { getUserList } from '../utils/dataFeches';
import axiosInstance from '../utils/axiosInstance';
import { FaCog } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Modal from "../components/Modal2";
import EditUser from "./forms/EditUser";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Zmiana stanu modala na boolean
    const [selectedUser, setSelectedUser] = useState(null);

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
        setDeleteError(null);
        try {
            await axiosInstance.delete(`/api/user/delete/${userId}/`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setDeleteError("Tego użytkownika nie można usunąć");
        }
    };

    const handleEditSuccess = async () => {
        try {
            const response = await getUserList();
            setUsers(response.data);
            setIsModalOpen(false); // Zamknięcie modala po sukcesie edycji
        } catch (error) {
            setError(error.message);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                                <button className="btn btn-info text-2xl mr-2" onClick={() => openModal(user)}>
                                    <FaCog />
                                </button>
                                <button className="btn btn-error text-2xl mr-2" onClick={() => handleDelete(user.id)}><AiFillDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedUser && (
                <Modal
                    element={<EditUser user={selectedUser} onSuccess={handleEditSuccess} />}
                    btn_Name={null}
                    btn_Style={null}
                    modal_ID={`Edit-${selectedUser.id}`}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}

            {deleteError && (
                <div className="alert alert-error mt-4">
                    <p>{deleteError}</p>
                </div>
            )}
        </div>
    );
};

export default UserList;
