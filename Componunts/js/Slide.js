import React, { useEffect, useRef, useState } from 'react';
import '../css/Slide.css';

import img1 from '../../assets/Slide/Banner_1.png';
import img2 from '../../assets/Slide/Banner_2.png';
import img3 from '../../assets/Slide/Banner_3.png';
import img4 from '../../assets/Slide/Banner_4.png';
import img5 from '../../assets/Slide/Banner_5.png';
import img6 from '../../assets/Slide/Banner_6.png';

// 추천 상품 이미지를 import 합니다
import product1 from '../../assets/Goods/1.jpg';
import product2 from '../../assets/Goods/2.jpg';
import product3 from '../../assets/Goods/3.jpg';
import product4 from '../../assets/Goods/4.jpg';
import product5 from '../../assets/Goods/5.jpg';
import product6 from '../../assets/Goods/12.jpg';
import product7 from '../../assets/Goods/13.jpg';
import product8 from '../../assets/Goods/14.jpg';
import product9 from '../../assets/Goods/15.jpg';
import product10 from '../../assets/Goods/16.jpg';

// 반값 상품 이미지를 import 합니다
import dis1 from '../../assets/Goods/6.jpg';
import dis2 from '../../assets/Goods/11.jpg';
import dis3 from '../../assets/Goods/8.jpg';
import dis4 from '../../assets/Goods/9.jpg';
import dis5 from '../../assets/Goods/10.jpg';

// "오늘의 쇼핑 제안" 아이콘 이미지를 import 합니다
import Today from '../../assets/Today.png';
import Discount from '../../assets/50.png';

// 카드 컴포넌트
const Card = ({ image, name, price }) => {
    return (
        <div className="card">
            <img src={image} alt={name} className="card-image" />
            <div className="card-content">
                <h3 className="card-name">{name}</h3>
                <p className="card-price">{price}</p>
            </div>
        </div>
    );
};

const Slide = () => {
    const images = [img1, img2, img3, img4, img5, img6];
    const [currentImage, setCurrentImage] = useState(0);
    const timerRef = useRef(null);

    // 다음 슬라이드로 넘어가는 함수
    const nextSlide = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    // 이전 슬라이드로 넘어가는 함수
    const prevSlide = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // 타이머를 초기화하고 재설정하는 함수
    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            nextSlide();
        }, 5000);
    };

    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    });

    // 수동으로 슬라이드를 넘길 때 타이머를 초기화하는 함수
    const handleNextSlide = () => {
        nextSlide();
        resetTimer();
    };

    const handlePrevSlide = () => {
        prevSlide();
        resetTimer();
    };

    // 추천 상품 목록
    const recommendations = [
        { image: product1, name: '엘론 미니 레터링 후드티', price: '10,000' },
        { image: product2, name: '파리스 후드티', price: '20,000' },
        { image: product3, name: '캔디 이중지 오버핏 탄탄 후드티', price: '30,000' },
        { image: product4, name: '유니버시티 오버핏 후드티', price: '40,000' },
        { image: product5, name: '유얼뉴욕 자수 레터링 후드티', price: '50,000' },
        { image: product6, name: '시애틀 자수 오버핏 후드', price: '60,000' },
        { image: product7, name: '핑크선셋 테디베어 반집업 후드', price: '70,000' },
        { image: product8, name: '브루클린 오버핏 후드', price: '80,000' },
        { image: product9, name: '와릿이즌 와펜 후드', price: '90,000' },
        { image: product10, name: '겐조 블랙 후드', price: '100,000' }
    ];

    // 반값 상품 목록
    const discountItems = [
        { image: dis1, name: '오버핏 호킨스 프린팅 후드티', price: '10000' },
        { image: dis2, name: '시카고 양기모 후드티', price: '20000' },
        { image: dis3, name: '개구리 기모 후드티', price: '30000' },
        { image: dis4, name: '스마일리 오버핏 기모 후드티', price: '40000' },
        { image: dis5, name: '2% 루즈핏 레이어드 후드티', price: '50000' }
    ];

    return (
        <div className="slideshow-container">
            <div className="special-offer-section">
            </div>
            <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} className="slide" />
            <button onClick={handlePrevSlide} className="prev">&#10094;</button>
            <button onClick={handleNextSlide} className="next">&#10095;</button>

            {/* 새로운 "오늘의 추천" 섹션 */}
            <div className="recommendation-section">
                <div className="title-container">
                    <h2 className="recommendation-title">
                        <img src={Today} alt="Suggestion Icon" className="suggestion-icon" />
                        오늘의 쇼핑 제안
                    </h2>
                    <h3 className="subtitle"> | 오늘 DW Shop이 엄선한 HOT한 상품!</h3>
                </div>
                <div className="recommendation-content">
                    {recommendations.map((item, index) => (
                        <Card key={index} image={item.image} name={item.name} price={`가격 : ${item.price}원`} />
                    ))}
                </div>
            </div>

            {/* 새로운 "오늘의 반값할인" 섹션 */}
            <div className="discount-section">
                <div className="title-container">
                    <h2 className="discount-title">
                        <img src={Discount} alt="Discount Icon" className="discount-icon" />
                        오늘의 반값할인
                    </h2>
                    <h3 className="subtitle"> | 최고의 딜을 놓치지 마세요!</h3>
                </div>
                <div className="discount-content">
                    {discountItems.map((item, index) => (
                        <Card
                            key={index}
                            image={item.image}
                            name={item.name}
                            price={`반값 가격 : ${Math.floor(parseInt(item.price) / 2).toLocaleString()}원`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide;
