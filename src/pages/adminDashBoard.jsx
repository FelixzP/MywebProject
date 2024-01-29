import React from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import DashBoard from '../components/bodyDashBoard'


import { useNavigate } from 'react-router-dom';

function AdminDashBoard() {

  return (
    <>
    <HeaderAdmin/>
    <DashBoard></DashBoard>
    </>
  )
}

export default AdminDashBoard