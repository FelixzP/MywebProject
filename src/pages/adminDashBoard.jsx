import React from 'react'
import Header from '../components/Header'
import DashBoard from '../components/bodyDashBoard'


import { useNavigate } from 'react-router-dom';

function AdminDashBoard() {
    const navigate = useNavigate();


  return (
    <>
    <Header></Header>
    <DashBoard></DashBoard>
    </>
  )
}

export default AdminDashBoard