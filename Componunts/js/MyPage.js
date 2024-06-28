import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const MyPage = () => {
 

  // 비밀번호 변경을 위한 상태 관리
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://1.226.84.83:8080/api/mypage', {
          headers: {
            'Authorization': token
          },
        });
        setMember(response.data);
      } catch (err) {
        setError('회원 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    

    fetchMemberInfo();
  }, []);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!member) {
    return <div>회원 정보를 불러올 수 없습니다.</div>;
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직을 여기에 추가
    if (newPassword !== confirmPassword) {
      setErrorMessage('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    // 현재 비밀번호와 새 비밀번호를 서버에 전송하여 변경 처리
    console.log('비밀번호 변경:', { currentPassword, newPassword });
    alert('비밀번호가 성공적으로 변경되었습니다.');
    // 상태 초기화
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  return (
    <section className="info-member-info">
      <h2 className="info-heading">회원 정보 보기</h2>
      <table className="info-info-table">
        <tbody>
          <tr>
            <td className="info-label">DW포인트</td>
            <td className="info-value">{member.point}</td> {/* dwPoint는 포인트 정보를 나타내는 필드입니다 */}
          </tr>
          </tbody>
      </table>
      <table className="info-info-table">
      <tbody>
      <tr>
            <td className="info-label">아이디(이메일)</td>
            <td className="info-value">{member.email}</td>
          </tr>
          <tr>
            <td className="info-label">이름</td>
            <td className="info-value">{member.memberName}</td>
          </tr>
          <tr>
            <td className="info-label">휴대폰 번호</td>
            <td className="info-value">{member.contact}</td>
          </tr>
          <tr>
            <td className="info-label">비밀번호 변경</td>
            <td className="info-value">
              <form onSubmit={handlePasswordChange} className="info-password-form">
                <div className="info-field">
                  <span className="info-label2">현재 비밀번호</span>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="info-field">
                  <span className="info-label2">새 비밀번호</span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="info-field">
                  <span className="info-label2">비밀번호 확인</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errorMessage && <div className="info-error-message">{errorMessage}</div>}
                </div>
                <button type="submit" className="info-button">비밀번호 변경</button>
              </form>
            </td>
          </tr>
          <tr>
            <td className="info-label">배송지 정보</td>
            <td className="info-value">
              배송지 주소 관리는 <a href="/delivery">[배송지 관리]</a>에서 수정, 등록 합니다.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
