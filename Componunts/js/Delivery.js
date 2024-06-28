import React, { useEffect, useState } from 'react';
import '../css/Delivery.css'; // CSS 파일을 임포트합니다.
import Logo from '../../assets/DW.png'; // 로고 이미지를 임포트합니다.
import axios from 'axios';

function ShippingAddressForm() {
    // 배송지 목록을 관리하는 상태와 초기값을 설정합니다.
    const [addressList, setAddressList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editedAddress, setEditedAddress] = useState({
        recipientName: '',
        deliveryLocation: '',
        contactNumber: ''
    });

    const [newAddress, setNewAddress] = useState({
        recipientName: '',
        deliveryLocation: '',
        contactNumber: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://1.226.84.83:8080/api/addresses/list', {
                headers: {
                    'Authorization': token
                }
            });
            setAddressList(response.data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedAddress(addressList[index]);
        setEditMode(true);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://1.226.84.83:8080/api/addresses/update/${addressList[editIndex].id}`, editedAddress, {
                headers: { 'Authorization': token }
            });
            fetchAddresses();
        } catch (error) {
            console.error('Error updating address:', error);
        }
        setEditMode(false);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://1.226.84.83:8080/api/addresses/delete/${id}`, {
                headers: { 'Authorization': token }
            });
            fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://1.226.84.83:8080/api/addresses/add', newAddress, {
                headers: { 'Authorization': token }
            });
            fetchAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
        }
        setAddMode(false);
        setNewAddress({
            recipientName: '',
            deliveryLocation: '',
            contactNumber: ''
        });
    };


    return (
        <div className="Delivery-container">
            <h2 className="Delivery-title">배송지 관리</h2>
            <button onClick={() => setAddMode(!addMode)} className="Delivery-addButton">배송지 추가</button>
            {addMode && (
                <div className="Delivery-addForm">
                    <input
                        type="text"
                        name="recipientName"
                        value={newAddress.recipientName}
                        onChange={handleNewChange}
                        placeholder="이름"
                        className="Delivery-input"
                    />
                    <input
                        type="text"
                        name="deliveryLocation"
                        value={newAddress.deliveryLocation}
                        onChange={handleNewChange}
                        placeholder="주소"
                        className="Delivery-input"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={newAddress.contactNumber}
                        onChange={handleNewChange}
                        placeholder="전화번호"
                        className="Delivery-input"
                    />
                    <button onClick={handleAdd} className="Delivery-button">추가</button>
                </div>
            )}
            <div className="Delivery-list">
                <ul className="Delivery-ul">
                    {addressList.map((address, index) => (
                        <li key={address.id} className="Delivery-li">
                            <div className="Delivery-info"><strong className="Delivery-name">{address.recipientName}</strong></div>
                            <div className="Delivery-info">{address.contactNumber}</div>
                            <div className="Delivery-info">{address.deliveryLocation}</div>
                            {editMode && editIndex === index ? (
                                <div className="Delivery-edit">
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={editedAddress.recipientName}
                                        onChange={handleChange}
                                        placeholder="수령인 이름"
                                        className="Delivery-input"
                                    />
                                    <input
                                        type="text"
                                        name="deliveryLocation"
                                        value={editedAddress.deliveryLocation}
                                        onChange={handleChange}
                                        placeholder="배송 주소"
                                        className="Delivery-input"
                                    />
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={editedAddress.contactNumber}
                                        onChange={handleChange}
                                        placeholder="전화번호"
                                        className="Delivery-input"
                                    />
                                    <button onClick={handleSave} className="Delivery-button">저장</button>
                                </div>
                            ) : (
                                <div className="Delivery-buttons">
                                    <button onClick={() => handleEdit(index)} className="Delivery-editButton">수정</button>
                                    <button onClick={() => handleDelete(address.id)} className="Delivery-deleteButton">삭제</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShippingAddressForm;
