import React, { useEffect, useState } from 'react';
import '../../Componunts/css/cartlist.css';
import logo from '../../assets/3.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    document.body.classList.add('cart-list-body'); // Add class name to body element

    return () => {
      document.body.classList.remove('cart-list-body'); // Clean up: remove class name when component unmounts
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`http://1.226.84.83:8080/api/cart`, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        const itemsWithCheckbox = response.data.map(item => ({
          ...item,
          checked: false
        }));
        setItems(itemsWithCheckbox);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  useEffect(() => {
    const total = items.reduce((sum, item) => {
      if (item.checked) {
        return sum + (item.product.price * item.quantity);
      }
      return sum;
    }, 0);
    setTotalAmount(total);
  }, [items]);

  const toggleCheckbox = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const toggleSelectAll = () => {
    const updatedItems = items.map(item => ({
      ...item,
      checked: !selectAll
    }));
    setItems(updatedItems);
    setSelectAll(!selectAll);
  };

  const increaseQuantity = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteCartItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://1.226.84.83:8080/api/cart/items`, {
        headers: {
          'Authorization': token
        },
        params: {
          productId
        }
      });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteCartItem(productId);
      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleCheckout = () => {
    const selectedItems = items.filter(item => item.checked);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    navigate('/payment-request');
  };
  return (
    <div className="cart">
      <Link to='/main'>
        <img src={logo} alt="Logo" className="cart-logo" />
      </Link>
      <div className="cart-section">
        <h2>◁ 장바구니</h2>
        <p className="cart-purchase-text">일반구매</p>
        <div className="cart-inner-section">
          <div className="cart-section1">
            <div className="cart-checkbox-group">
              {items.map(item => (
                <div className="cart-checkbox-item" key={item.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }} className='cart-checkbox-item-name'>
                    <input
                      type="checkbox"
                      id={`item${item.id}`}
                      name={`item${item.id}`}
                      checked={item.checked}
                      onChange={() => toggleCheckbox(item.id)}
                    />
                    <img src={item.product.imageUrl} alt={item.product.name} className="cart-section-image" />
                    <label htmlFor={`item${item.id}`}>
                      <p className='cart-productName'>{item.product.productName}</p>
                      <p className='cart-price'>{item.product.price.toLocaleString()}원</p>
                      <div className="cart-quantity-control">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                    </label>
                  </div>
                  <button
                    className='cart-product-delete'
                    onClick={() => handleDelete(item.product.id)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-select-all-container">
              <button onClick={toggleSelectAll}>
                <strong>{selectAll ? "전체 해제" : "전체 선택"}</strong>
              </button>
            </div>
          </div>
          <div className="cart-section2 cart-section">
            <h3>예상 결제 금액</h3>
            <p>상품금액 : {totalAmount.toLocaleString()}원</p>
            <p className='cart-total'>총 결제금액 : {totalAmount.toLocaleString()}원</p>
            <Link to={'/order'}>
              <button className="cart-checkout-button" onClick={handleCheckout}>결제하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;