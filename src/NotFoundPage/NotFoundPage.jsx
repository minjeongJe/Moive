import React from 'react'
import './NotFoundPage.style.css'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
      <div className={"text-center"} fluid>
        <h1>해당페이지를 찾지 못했습니다.</h1>
        <div onClick={() => navigate('/')}>홈페이지로 이동하기</div>
      </div>
  )
}

export default NotFoundPage
