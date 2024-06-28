import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { maskPhoneNumber } from './utils'; // utils 파일에서 maskPhoneNumber 함수를 가져옵니다.
import './MemberEditPage.css';
const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

function MemberEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [editMemberData, setEditMemberData] = useState({
    memberType: '',
    memberId: '',
    memberName: '',
    birthdate: '',
    gender: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/members/${id}`);
        const memberData = response.data;
        setMember(memberData);
        setEditMemberData({
          memberType: memberData.memberType,
          memberId: memberData.memberId,
          memberName: memberData.memberName,
          birthdate: memberData.birthdate,
          gender: memberData.gender,
          email: memberData.email,
          contact: maskPhoneNumber(memberData.contact)
        });
      } catch (error) {
        console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchMemberData();
  }, [id]);

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setEditMemberData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSaveClick = () => {
    axios.put(`http://1.226.84.83:8080/api/members/${id}`, {
      memberType: editMemberData.memberType
    })
      .then(() => {
        alert('회원 정보가 성공적으로 업데이트되었습니다.');
        navigate('/admin/member/list');
      })
      .catch(error => {
        console.error('회원 정보를 업데이트하는 중 오류가 발생했습니다:', error);
        alert('회원 정보를 업데이트하는 중 오류가 발생했습니다.');
      });
  };

  const handleCancelClick = () => {
    navigate('/admin/member/list');
  };

  if (!member) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="member-edit-page-container">
      <h1>회원 정보</h1>
      <div className="member-edit-page-form">
        <label>회원 타입</label>
        <select
          className="member-edit-page-input"
          value={editMemberData.memberType}
          onChange={(e) => handleInputChange(e, 'memberType')}
        >
          <option value="USER">일반 회원</option>
          <option value="ADMIN">관리자</option>
        </select>
        <label>아이디</label>
        <input
          type="text"
          className="member-edit-page-input"
          value={editMemberData.memberId}
          disabled
        />
        <label>이름</label>
        <input
          type="text"
          className="member-edit-page-input"
          value={editMemberData.memberName}
          disabled
        />
        <label>생년월일</label>
        <input
          type="date"
          className="member-edit-page-input"
          value={editMemberData.birthdate}
          disabled
        />
        <label>성별</label>
        <select
          className="member-edit-page-input"
          value={editMemberData.gender}
          disabled
        >
          <option value="Male">남자</option>
          <option value="Female">여자</option>
        </select>
        <label>이메일</label>
        <input
          type="email"
          className="member-edit-page-input"
          value={editMemberData.email}
          disabled
        />
        <label>전화번호</label>
        <input
          type="text"
          className="member-edit-page-input"
          value={editMemberData.contact}
          disabled
        />
        <div className="member-edit-page-buttons">
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default MemberEditPage;
