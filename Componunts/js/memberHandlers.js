import axios from 'axios';
import { showError, errorMessages } from './messages';
import { getSortedMembers, filteredMembers } from './SortUtilsFull';
import { fetchMembers } from './memberListPageApi';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

export const handleSaveClick = async (editMemberData, editMemberId, members, setMembers, setEditMemberId, setEditMemberData, setDisplayedMemberCount) => {
  if (!editMemberData.memberId) {
    alert('아이디 칸을 입력해야 합니다.');
    return;
  }
  if (!editMemberData.memberName) {
    alert('이름 칸을 입력해야 합니다.');
    return;
  }
  if (!editMemberData.email) {
    alert('이메일 칸을 입력해야 합니다.');
    return;
  }
  if (!editMemberData.contact) {
    alert('전화번호 칸을 입력해야 합니다.');
    return;
  }

  try {
    const memberToUpdate = { ...editMemberData };
    await axios.put(`${apiUrl}/api/members/${editMemberId}`, memberToUpdate);
    const updatedMembers = await fetchMembers(); // 최신 회원 목록을 가져옴
    setMembers(updatedMembers);
    setEditMemberId(null);
    setEditMemberData(null);
    setDisplayedMemberCount(filteredMembers(updatedMembers).length);
    alert('성공적으로 저장되었습니다.');
  } catch (error) {
    showError(errorMessages.saveMember);
  }
};

export const handleCancelClick = (setEditMemberId, setEditMemberData) => {
  setEditMemberId(null);
  setEditMemberData(null);
};

export const handleDeleteClick = async (memberId, members, setMembers, setDisplayedMemberCount) => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`${apiUrl}/api/members/${memberId}`);
      const updatedMembers = await fetchMembers(); // 최신 회원 목록을 가져옴
      setMembers(updatedMembers);
      setDisplayedMemberCount(filteredMembers(updatedMembers).length);
      alert('성공적으로 삭제되었습니다.');
    } catch (error) {
      showError(errorMessages.deleteMember);
    }
  }
};

export const handleEditClick = (memberId, members, setEditMemberData, setEditMemberId) => {
  const memberToEdit = members.find(member => member.id === memberId);
  setEditMemberData({ ...memberToEdit });
  setEditMemberId(memberId);
};

export const handleInputChange = (event, key, setEditMemberData) => {
  const { value } = event.target;
  setEditMemberData(prevState => ({
    ...prevState,
    [key]: value
  }));
};

export const handleKeyDown = (event) => {
  const { key } = event;
  const isControlKey = key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab';
  if (!/^\d$/.test(key) && !isControlKey) {
    event.preventDefault();
  }
};

export const handleShowMembersClick = async (setMembers, setShowMembers, setDisplayedMemberCount, setCurrentPage, setSortCriteria, setSortDirection, setLocalSortCriteria, setLocalSortDirection) => {
  const members = await fetchMembers(); // 최신 회원 목록을 가져옴
  setMembers(members);
  setShowMembers(true);
  setDisplayedMemberCount(filteredMembers(members).length);
  setCurrentPage(1);
  setSortCriteria('default');
  setSortDirection('asc');
  setLocalSortCriteria('default');
  setLocalSortDirection('asc');
};
