import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './components/Home'
import Login from './components/Login'
import MenuBar from './components/MebuBar'
import Register from './components/Register'

function App() {
	return (
		<div className='layout'>
			<MenuBar />
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
