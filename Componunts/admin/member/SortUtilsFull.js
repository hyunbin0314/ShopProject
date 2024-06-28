import React from 'react';

export function SortControls({ handleSortChange, sortDirection, setSortDirection }) {
  return (
    <div className="sort-controls">
      <label></label>
      <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
      <select onChange={(e) => handleSortChange(e.target.value)}>
        <option value="default">기존 순서</option>
        <option value="name">이름 순서</option>
        <option value="email">이메일 순서</option>
        <option value="contact">전화번호 순서</option>
      </select>
    </div>
  );
}

export const handleSortChange = (criteria, currentPage, sortCriteria, sortDirection, setSortCriteria, setSortDirection, localSortCriteria, setLocalSortCriteria, localSortDirection, setLocalSortDirection) => {
  if (currentPage === 1) {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('asc');
    }
  } else {
    if (localSortCriteria === criteria) {
      setLocalSortDirection(localSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setLocalSortCriteria(criteria);
      setLocalSortDirection('asc');
    }
  }
};

export const getSortedMembers = (membersToSort, criteria, direction) => {
  const sortedMembers = [...membersToSort];
  const sortDirectionMultiplier = direction === 'asc' ? 1 : -1;

  switch (criteria) {
    case 'name':
      sortedMembers.sort((a, b) => a.memberName.localeCompare(b.memberName) * sortDirectionMultiplier);
      break;
    case 'email':
      sortedMembers.sort((a, b) => a.email.localeCompare(b.email) * sortDirectionMultiplier);
      break;
    case 'contact':
      sortedMembers.sort((a, b) => a.contact.localeCompare(b.contact) * sortDirectionMultiplier);
      break;
    case 'default':
    default:
      break;
  }
  return sortedMembers;
};

export const filteredMembers = (membersToFilter, sortCriteria, sortDirection) => {
  return getSortedMembers(membersToFilter, sortCriteria, sortDirection);
};
