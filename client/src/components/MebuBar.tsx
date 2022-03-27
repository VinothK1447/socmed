import React, { useState } from 'react'
import classNames from 'classnames'

const MenuBar = () => {
	const [active, setActive] = useState('')

	const handleClick = (ev: React.MouseEvent<HTMLAnchorElement>, type: string) => {
		setActive(type)
	}

	return (
		<div className='menubar'>
			<nav>
				<ul>
					<li className={classNames('left-menu', active === 'home' && 'active')}>
						<a href={'/'} onClick={(ev) => handleClick(ev, 'home')}>
							Home
						</a>
					</li>
					<li className={classNames('right-menu', active === 'login' && 'active')}>
						<a href={'/login'} onClick={(ev) => handleClick(ev, 'login')}>
							Login
						</a>
					</li>
					<li className={classNames('right-menu', active === 'register' && 'active')}>
						<a href={'/register'} onClick={(ev) => handleClick(ev, 'register')}>
							Register
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default MenuBar
