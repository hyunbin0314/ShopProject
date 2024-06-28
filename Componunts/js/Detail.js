import React, { useEffect, useState } from 'react'
import '../css/Detail.css';
import StarRating from './StarRating';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [newRating, setNewRating] = useState(0); // 별점 상태 추가
  const [activeTab, setActiveTab] = useState('리뷰'); // 현재 활성화된 탭 상태 추가
  const [currentPageReview, setCurrentPageReview] = useState(1); // 리뷰 페이지
  const [currentPageQuestion, setCurrentPageQuestion] = useState(1); // 상품문의 페이지
  const itemsPerPage = 5; // 한 페이지에 표시할 리뷰 및 상품문의 개수tiveTab, setActiveTab] = useState('리뷰'); // 현재 활성화된 탭 상태 추가

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://1.226.84.83:8080/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://1.226.84.83:8080/api/reviews/product/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://1.226.84.83:8080/api/cart/items`, null, {
        headers: {
          Authorization: token,
        },
        params: {
          productId: id,
          quantity: quantity, // 수량을 함께 전송
        },
      });
    } catch (error) {
      console.error('장바구니에 상품 추가 중 에러 발생:', error);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (newReview.trim()) {
      try {
        const response = await axios.post(
          'http://1.226.84.83:8080/api/reviews',
          {
            productId: id,
            content: newReview.trim(),
            rating: newRating,
          },
          {
            headers: {
              'Authorization': token,
            },
          }
        );
        setReviews([...reviews, response.data]);
        setNewReview('');
        setNewRating(0);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  const handleReviewDelete = async (reviewId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://1.226.84.83:8080/api/reviews/${reviewId}`, {
        headers: {
          'Authorization': token,
        },
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleQuestionSubmit = e => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const question = {
        adminNote: '🔒 관리자만 확인할 수 있는 문의 사항입니다.', // 관리자 노트 추가
      };
      setQuestions([...questions, question]);
      setNewQuestion('');
    }
  };



  // product.price가 undefined일 경우 기본값을 0으로 설정
  const price = product?.price || 0;
  const totalPrice = (price * quantity).toLocaleString();

  // 현재 페이지에 해당하는 리뷰 목록을 계산하는 함수
  const indexOfLastReview = currentPageReview * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // 현재 페이지에 해당하는 상품문의 목록을 계산하는 함수
  const indexOfLastQuestion = currentPageQuestion * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div className="product-detail-container">
      <section className="product-detail-img-info">
        <div className="product-img">
          <img src={product?.imageUrl} alt={product?.productName} />
        </div>
        <div className="product-detail">
          <h3>{product?.productName}</h3>
          <h2>{price}원</h2>
          <hr />
          <span style={{ fontWeight: '700', fontSize: '18px' }}>배송정보</span>
          <p>5/31 도착예정</p>
          <p>배송사: 대우배송</p>
          <hr />
          <span style={{ fontWeight: '700', fontSize: '18px' }}>배송비</span>
          <p>3,000원</p>
          <span>제주: 3,000원 추가, 도서산간: 5,000원 추가</span>
          <hr />
          <div className="product-quantity-control">
            <button type="button" onClick={decreaseQuantity}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <h1 style={{ fontSize: '25px', color: 'red', textAlign: 'right' }}>
            총 가격 : {totalPrice}원
          </h1>
          <button className="custom-btn btn-3" onClick={handleAddToCart}>
            <span>장바구니 담기</span>
          </button>
          <Link to={'/cart'}>
            <button className="custom-btn btn-4">
              <span>장바구니 가기</span>
            </button>
          </Link>
          <Link to={'/order'}>
            <button className="custom-btn btn-5">
              <span>구매하기</span>
            </button>
          </Link>
        </div>
      </section>

      <div className="product-detail-menu">
        <div
          className={`product-detail-menu-item ${
            activeTab === '리뷰' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('리뷰')}
        >
          리뷰
        </div>
        <div
          className={`product-detail-menu-item ${
            activeTab === '상품문의' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('상품문의')}
        >
          상품문의
        </div>
        <div
          className={`product-detail-menu-item ${
            activeTab === '배송안내' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('배송안내')}
        >
          배송안내
        </div>
      </div>

      {/* 메뉴바 아래에 각 탭에 대한 내용 추가 (현재는 리뷰 탭만 보이게 설정) */}
      {activeTab === '리뷰' && (
        <section className="product-detail-review">
        <div className="review-container">
          {/* 리뷰 작성 섹션 */}
          <form onSubmit={handleReviewSubmit} className="product-detail-review-form">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="리뷰를 작성하세요"
              className="product-detail-review-textarea"
            ></textarea>
            <div className="product-detail-review-rating-select-container">
              <label>
                <StarRating rating={newRating} onRatingChange={setNewRating} />
              </label>
            </div>
            <button type="submit" className="product-detail-review-submit">리뷰 작성</button>
          </form>

          {/* 리뷰 보기 섹션 */}
          <div className="product-detail-review-list">
            {currentReviews.map((review, index) => (
              <div key={index} className="product-detail-review-item">
                <div className="product-detail-review-reviewer">작성자: {review.memberName}</div>
                <StarRating rating={review.rating} />
                <div className="product-detail-review-text">{review.content}</div>
                <button className="delete-button" onClick={() => handleReviewDelete(review.id)}>삭제</button>
              </div>
            ))}
          </div>

          {/* 리뷰 페이지네이션 */}
          <div className="product-detail-review-pagination">
            {currentPageReview > 1 && (
              <button className="pagination-button" onClick={() => setCurrentPageReview(currentPageReview - 1)}>이전</button>
            )}
            {currentReviews.length === itemsPerPage && (
              <button className="pagination-button" onClick={() => setCurrentPageReview(currentPageReview + 1)}>다음</button>
            )}
          </div>
        </div>
      </section>
      )}

      {/* 상품문의 섹션 */}
      {activeTab === '상품문의' && (
        <section className="product-detail-questions">
          <div className="question-container">
            {/* 질문 작성 섹션 */}
            <form onSubmit={handleQuestionSubmit} className="product-detail-question-form">
              <textarea
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                placeholder="상품에 대한 질문을 작성하세요"
                className="product-detail-question-textarea"
              ></textarea>
              <button type="submit" className="product-detail-question-submit">
                질문 작성
              </button>
            </form>

            {/* 질문 보기 섹션 */}
            <div className="product-detail-question-list">
              {currentQuestions.map((question, index) => (
                <div key={index} className="product-detail-question-item">
                  <div className="product-detail-question-asker">
                    {question.asker}
                  </div>
                  <div className="product-detail-question-text">
                    {question.question}
                  </div>
                  <div className="product-detail-question-admin-note">
                    {question.adminNote}
                  </div>
                </div>
              ))}
            </div>

            {/* 질문 페이지네이션 */}
            <div className="product-detail-question-pagination">
              {currentPageQuestion > 1 && (
                <button
                  className="pagination-button"
                  onClick={() => setCurrentPageQuestion(currentPageQuestion - 1)}
                >
                  이전
                </button>
              )}
              {currentQuestions.length === itemsPerPage && (
                <button
                  className="pagination-button"
                  onClick={() => setCurrentPageQuestion(currentPageQuestion + 1)}
                >
                  다음
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 배송안내 섹션 */}
      {activeTab === '배송안내' && (
        <section className="product-detail-delivery-info">
          <h2>배송안내</h2>
          <br/>
          <p>DW Shop입니다. 저희 쇼핑몰은 주문 후 결제 즉시 출고하고 있으며 영업일 기준 최대 3일 내 배송완료됩니다.</p>
          <p>명절 및 공휴일, 주말에는 배송이 불가 하오니 참고 부탁드립니다.</p>
          <br/>
          <p>이용해주셔서 감사합니다. 믿고 구매해주시는 고객님들께 최선을 다하는 DW Shop이 되겠습니다. 감사합니다.</p>
        </section>
      )}
    </div>
  );
};

export default Detail
