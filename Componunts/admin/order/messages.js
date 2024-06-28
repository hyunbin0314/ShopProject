// messages.js

// 에러 메시지를 알림창으로 표시하는 함수
export const showError = (message) => {
  alert(message); // 간단한 에러 알림 예제
};

// 에러 메시지 객체
export const errorMessages = {
  fetchOrders: "주문 목록을 불러오는 중 오류가 발생했습니다.",
  fetchOrderStatuses: "주문 상태를 불러오는 중 오류가 발생했습니다."
};
