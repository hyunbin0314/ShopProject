import React, { useEffect, useState } from 'react';
import '../css/Test.css';
import logo from '../../assets/3.png';
import infoIcon from '../../assets/Info.png';
import cartIcon from '../../assets/Cart.png';
import searchIcon from '../../assets/Search.png'; // 검색 아이콘 추가
import categoryBannerIcon from '../../assets/CatThree.png'; // 카테고리 배너 아이콘 추가
import topIcon from '../../assets/Top.png'; // 상의 아이콘 추가
import bottomIcon from '../../assets/Bottom.png'; // 하의 아이콘 추가
import outerIcon from '../../assets/Over.png'; // 아우터 아이콘 추가
import shoesIcon from '../../assets/Shoes.png'; // 신발 아이콘 추가
import accessoryIcon from '../../assets/AC.png'; // 액세서리 아이콘 추가
import HoodiIcon from '../../assets/sub/Top/Hoodi.png';  // 후드티 아이콘 추가
import LongTshirtIcon from '../../assets/sub/Top/LongTshirt.png'; // 긴소매 아이콘 추가
import SweaterIcon from '../../assets/sub/Top/Sweater.png'; // 스웨터 아이콘 추가
import CTshirtIcon from '../../assets/sub/Top/CTshirt.png'; // 카라티 아이콘 추가
import MentoMenIcon from '../../assets/sub/Top/MentoMen.png'; // 맨투맨 아이콘 추가
import ShirtIcon from '../../assets/sub/Top/Shirt.png'; // 셔츠 아이콘 추가
import ShotTshirtIcon from '../../assets/sub/Top/ShotTshirt.png'; // 반소매 아이콘 추가
import SportTshirtIcon from '../../assets/sub/Top/SportTshirt.png'; // 스포츠웨어 아이콘 추가
import CapIcon from '../../assets/sub/AC/Cap.png'; // 모자 아이콘 추가
import BagIcon from '../../assets/sub/AC/Bag.png'; // 가방 아이콘 추가
import NecklaceIcon from '../../assets/sub/AC/Necklace.png'; // 목걸이 아이콘 추가
import EarringsIcon from '../../assets/sub/AC/Earrings.png'; // 귀걸이 아이콘 추가
import RingIcon from '../../assets/sub/AC/Ring.png'; // 반지 아이콘 추가
import GlassesIcon from '../../assets/sub/AC/Glasses.png'; // 안경 아이콘 추가
import WristwatchIcon from '../../assets/sub/AC/Wristwatch.png'; // 시계 아이콘 추가
import ShoesIcon from '../../assets/sub/Shoes/Shoes.png'; // 구두 아이콘 추가
import CrocsIcon from '../../assets/sub/Shoes/Crocs.png'; // 크록스 아이콘 추가
import SliperIcon from '../../assets/sub/Shoes/Sliper.png'; // 슬리퍼 아이콘 추가
import RunningIcon from '../../assets/sub/Shoes/Running.png'; // 런닝화 아이콘 추가
import DefaultIcon from '../../assets/sub/Shoes/Default.png'; // 단화 아이콘 추가
import BootsIcon from '../../assets/sub/Shoes/Boots.png'; // 부츠 아이콘 추가
import SportsShoesIcon from '../../assets/sub/Shoes/SportsShoes.png'; // 스포츠신발 아이콘 추가
import MustangIcon from '../../assets/sub/Over/Mustang.png'; // 무스탕 아이콘 추가
import SuitIcon from '../../assets/sub/Over/Suit.png'; // 슈트 아이콘 추가
import AnorakIcon from '../../assets/sub/Over/Anorak.png'; // 아노락 아이콘 추가
import SPaddingIcon from '../../assets/sub/Over/SPadding.png'; // 숏패딩 아이콘 추가
import LPaddingIcon from '../../assets/sub/Over/LPadding.png'; // 롱패딩 아이콘 추가
import CardiganIcon from '../../assets/sub/Over/Cardigan.png'; // 가디건 아이콘 추가
import CoatIcon from '../../assets/sub/Over/Coat.png'; // 코트 아이콘 추가
import CottonIcon from '../../assets/sub/Bottom/Cotton.png'; // 코튼 아이콘 추가
import DenimIcon from '../../assets/sub/Bottom/Denim.png'; // 데님 아이콘 추가
import JoggerIcon from '../../assets/sub/Bottom/Jogger.png'; // 조거 아이콘 추가
import SuitBottomIcon from '../../assets/sub/Bottom/SuitBottom.png'; // 슈트 하의 아이콘 추가
import JumpsuitIcon from '../../assets/sub/Bottom/Jumpsuit.png'; // 점프슈트 아이콘 추가
import LeggingsIcon from '../../assets/sub/Bottom/Leggings.png'; // 레깅스 아이콘 추가
import SkirtIcon from '../../assets/sub/Bottom/Skirt.png'; // 치마 아이콘 추가
import DressIcon from '../../assets/sub/Bottom/Dress.png'; // 원피스 아이콘 추가
import SportsBottomIcon from '../../assets/sub/Bottom/SportsBottom.png'; // 스포츠 하의 아이콘 추가
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '../../assets/Login.png'
import axios from 'axios';


const Test = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // 모든 로컬 스토리지 항목 삭제
    navigate('/');
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 클래스 이름 추가
    document.body.classList.add('main-page');

    // 컴포넌트가 언마운트될 때 클래스 이름 제거
    return () => {
      document.body.classList.remove('main-page');
    };
  }, []);

  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    }
  };

  const categories = [
    {
      name: "상의",
      icon: topIcon,
      subcategories: [
        { id: 1, name: "후드티셔츠", icon: HoodiIcon },
        { id: 2, name: "반소매티셔츠", icon: ShotTshirtIcon },
        { id: 3, name: "긴소매티셔츠", icon: LongTshirtIcon },
        { id: 4, name: "니트/스웨터", icon: SweaterIcon },
        { id: 5, name: "카라티셔츠", icon: CTshirtIcon },
        { id: 6, name: "맨투맨", icon: MentoMenIcon },
        { id: 7, name: "셔츠/블라우스", icon: ShirtIcon },
        { id: 8, name: "스포츠웨어", icon: SportTshirtIcon }
      ]
    },
    {
      name: "하의",
      icon: bottomIcon,
      subcategories: [
        { id: 9, name: "코튼팬츠", icon: CottonIcon },
        { id: 10, name: "데님팬츠", icon: DenimIcon },
        { id: 11, name: "조거팬츠", icon: JoggerIcon },
        { id: 12, name: "슈트/슬랙스", icon: SuitBottomIcon },
        { id: 13, name: "점프슈트", icon: JumpsuitIcon },
        { id: 14, name: "레깅스", icon: LeggingsIcon },
        { id: 15, name: "치마", icon: SkirtIcon },
        { id: 16, name: "원피스", icon: DressIcon },
        { id: 17, name: "스포츠웨어", icon: SportsBottomIcon }
      ]
    },
    {
      name: "아우터",
      icon: outerIcon,
      subcategories: [
        { id: 18, name: "무스탕", icon: MustangIcon },
        { id: 19, name: "슈트", icon: SuitIcon },
        { id: 20, name: "아노락재킷", icon: AnorakIcon },
        { id: 21, name: "숏패딩", icon: SPaddingIcon },
        { id: 22, name: "롱패딩", icon: LPaddingIcon },
        { id: 23, name: "가디건", icon: CardiganIcon },
        { id: 24, name: "코트", icon: CoatIcon }
      ]
    },
    {
      name: "신발",
      icon: shoesIcon,
      subcategories: [
        { id: 25, name: "구두", icon: ShoesIcon },
        { id: 26, name: "크록스", icon: CrocsIcon },
        { id: 27, name: "런닝화", icon: RunningIcon },
        { id: 28, name: "슬리퍼", icon: SliperIcon },
        { id: 29, name: "단화", icon: DefaultIcon },
        { id: 30, name: "부츠", icon: BootsIcon },
        { id: 31, name: "스포츠신발", icon: SportsShoesIcon }
      ]
    },
    {
      name: "액세서리",
      icon: accessoryIcon,
      subcategories: [
        { id: 32, name: "모자", icon: CapIcon },
        { id: 33, name: "가방", icon: BagIcon },
        { id: 34, name: "반지/팔찌", icon: RingIcon },
        { id: 35, name: "목걸이", icon: NecklaceIcon },
        { id: 36, name: "귀걸이", icon: EarringsIcon },
        { id: 37, name: "선글라스/안경", icon: GlassesIcon },
        { id: 38, name: "시계", icon: WristwatchIcon }
      ]
    }
  ];

  return (
    <header className="header">
      <div
        className="category-dropdown"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="category-banner">
          <img src={categoryBannerIcon} alt="Category Banner" className="category-banner-icon" />

        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {categories.map((category, index) => (
              <div
                key={index}
                className="dropdown-item"
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <img src={category.icon} alt={category.name} className="category-icon" />
                <span>{category.name}</span>
                {activeCategory === index && (
                  <div className="subcategory-menu">
                    {category.subcategories.map(subcategory => (
                      <Link to={`/products/${subcategory.id}`} key={subcategory.id}>
                        <div className="subcategory-item">
                          <img src={subcategory.icon} alt={subcategory.name} className="subcategory-icon" />
                          <span>{subcategory.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="logo">
        <Link to="/main"><img src={logo} alt="Logo" className="logo-image" /></Link>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="찾으실 상품을 검색하세요"
          value={keyword || ''}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <img
          src={searchIcon}
          alt="Search"
          className="search-icon"
          onClick={handleSearch}
        />
      </div>

      <div className="icon-container">
        <Link to={'/mypage'}>
          <div className="icon-wrapper">
            <img src={infoIcon} alt="Info" className="icon" />
            <span>내 정보</span>
          </div>
        </Link>
        <Link to={'/cart'}>
          <div className="icon-wrapper">
            <img src={cartIcon} alt="Cart" className="icon" />
            <span>장바구니</span>
          </div>
        </Link>
        <div className="icon-wrapper" onClick={handleLogout}>
          <img src={LoginIcon} alt="Login" className="icon" />
          <span>로그아웃</span>
        </div>
      </div>
    </header>
  );
};

export default Test;

