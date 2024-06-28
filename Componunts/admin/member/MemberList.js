import React from 'react';
import { Link } from 'react-router-dom';
import { maskPhoneNumber } from './utils';

function MemberList({
  currentMembers,
  editMemberId,
  editMemberData,
  handleInputChange,
  handleKeyDown,
  handleSaveClickWrapper,
  handleCancelClickWrapper,
  handleEditClick,
  handleDeleteClickWrapper
}) {
  return (
    <table className="member-list-page-table">
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>이메일</th>
          <th>전화번호</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {currentMembers.map(member => (
          <tr key={member.id} className="member-list-page-row">
            <td className="member-list-page-field">
              {editMemberId === member.id ? (
                <input
                  type="text"
                  className="member-list-page-input"
                  value={editMemberData.memberId}
                  onChange={(e) => handleInputChange(e, 'memberId')}
                />
              ) : (
                <div className="member-list-page-id">{member.memberId}</div>
              )}
            </td>
            <td className="member-list-page-field">
              {editMemberId === member.id ? (
                <input
                  type="text"
                  className="member-list-page-input"
                  value={editMemberData.memberName}
                  onChange={(e) => handleInputChange(e, 'memberName')}
                />
              ) : (
                <div className="member-list-page-name">{member.memberName}</div>
              )}
            </td>
            <td className="member-list-page-field">
              {editMemberId === member.id ? (
                <input
                  type="text"
                  className="member-list-page-input"
                  value={editMemberData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
              ) : (
                <div className="member-list-page-email">{member.email}</div>
              )}
            </td>
            <td className="member-list-page-field">
              {editMemberId === member.id ? (
                <input
                  type="text"
                  className="member-list-page-input"
                  value={editMemberData.contact}
                  onChange={(e) => handleInputChange(e, 'contact')}
                />
              ) : (
                <div className="member-list-page-contact">{maskPhoneNumber(member.contact)}</div>
              )}
            </td>
            <td className="member-list-page-buttons">
              {editMemberId === member.id ? (
                <>
                  <button onClick={handleSaveClickWrapper}>저장</button>
                  <button onClick={handleCancelClickWrapper}>취소</button>
                </>
              ) : (
                <>
                  <Link to={`/admin/member/${member.id}`}>
                    <button>상세보기</button>
                  </Link>
                  <button onClick={() => handleDeleteClickWrapper(member.id)}>삭제</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MemberList;
