import React, { useState, useEffect } from 'react';
import './MemberListPage.css';
import { fetchMembers } from './memberListPageApi';
import { showError, errorMessages } from './messages';
import { Pagination, PaginationControls, handleMembersPerPageChange } from './PaginationFull';
import MemberList from './MemberList';
import {
  handleDeleteClick,
  handleEditClick,
  handleInputChange,
  handleSaveClick,
  handleCancelClick,
  handleKeyDown,
  handleShowMembersClick
} from './memberHandlers';
import SearchComponent from './SearchComponent';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

function MemberListPage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberData, setEditMemberData] = useState(null);
  const [error, setError] = useState('');
  const [showMembers, setShowMembers] = useState(true);
  const [displayedMemberCount, setDisplayedMemberCount] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(20);
  const [localSortCriteria, setLocalSortCriteria] = useState('default');
  const [localSortDirection, setLocalSortDirection] = useState('asc');

  useEffect(() => {
    fetchMembers().then(data => {
      setMembers(data);
      setFilteredMembers(data);
    }).catch(() => {
      showError(errorMessages.fetchMembers);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm === '') {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(member =>
        member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
    setCurrentPage(1); // 검색 시 1페이지로 이동
  };

  const handleMembersPerPageChangeWrapper = (event) => {
    handleMembersPerPageChange(event, setMembersPerPage, setCurrentPage);
  };

  const handleEditClickWrapper = (memberId) => {
    handleEditClick(memberId, members, setEditMemberData, setEditMemberId);
  };

  const handleInputChangeWrapper = (event, key) => {
    handleInputChange(event, key, setEditMemberData);
  };

  const handleShowMembersClickWrapper = () => {
    handleShowMembersClick(setMembers, setShowMembers, setDisplayedMemberCount, setCurrentPage, setSortCriteria, setSortDirection, setLocalSortCriteria, setLocalSortDirection);
    setEditMemberId(null);
    setEditMemberData(null);
  };

  const handleSaveClickWrapper = () => {
    handleSaveClick(editMemberData, editMemberId, members, setMembers, setEditMemberId, setEditMemberData, setDisplayedMemberCount);
  };

  const handleCancelClickWrapper = () => {
    handleCancelClick(setEditMemberId, setEditMemberData);
  };

  const handleDeleteClickWrapper = (memberId) => {
    handleDeleteClick(memberId, members, setMembers, setDisplayedMemberCount);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  let currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="member-list-container">
      <h1>Logo 사진파일 들어갈 예정입니다.(사진이 집컴에 없음)</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="member-list-page-controls">
        <div className="member-count">회원목록 (총 {filteredMembers.length}명)</div>
        <div className="member-count2">
        <SearchComponent
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
          setCurrentPage={setCurrentPage}
        />
        <PaginationControls
          membersPerPage={membersPerPage}
          handleMembersPerPageChange={handleMembersPerPageChangeWrapper}
          totalMembers={filteredMembers.length}
        />
        </div>
      </div>
      {showMembers && (
        <>
          <div className="member-list-page-table-container">
            <MemberList
              currentMembers={currentMembers}
              editMemberId={editMemberId}
              editMemberData={editMemberData}
              handleInputChange={handleInputChangeWrapper}
              handleKeyDown={handleKeyDown}
              handleSaveClickWrapper={handleSaveClickWrapper}
              handleCancelClickWrapper={handleCancelClickWrapper}
              handleEditClick={handleEditClickWrapper}
              handleDeleteClickWrapper={handleDeleteClickWrapper}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default MemberListPage;
