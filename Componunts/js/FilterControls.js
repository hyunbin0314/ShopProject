import React from 'react';

function FilterControls({
  productTypes,
  selectedParentType,
  selectedSubType,
  onParentTypeChange,
  onSubTypeChange,
}) {
  const uniqueParentTypes = Array.from(new Set(productTypes.map(pt => pt.parentType))).sort();
  const filteredSubTypes = productTypes.filter(pt => pt.parentType === selectedParentType).sort((a, b) => a.productType.localeCompare(b.productType));

  return (
    <div className="filter-container">
      <select 
        value={selectedParentType} 
        onChange={onParentTypeChange} 
        className="filter-select"
      >
        <option value="전체보기">전체보기</option>
        {uniqueParentTypes.map(parentType => (
          <option key={parentType} value={parentType}>{parentType}</option>
        ))}
      </select>
      <select 
        value={selectedSubType} 
        onChange={onSubTypeChange} 
        disabled={!selectedParentType || selectedParentType === '전체보기'}
        className={`filter-select ${selectedParentType && selectedParentType !== '전체보기' ? "enabled" : ""}`}
      >
        {selectedParentType && selectedParentType !== '전체보기' && (
          <>
            <option value="전체보기">전체보기</option>
            {filteredSubTypes.map(subType => (
              <option key={subType.productType} value={subType.productType}>{subType.productType}</option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}

export default FilterControls;
