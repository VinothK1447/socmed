import React from 'react'
import * as TypeProps from '../componentProps'

const Card = (props: TypeProps.cardProps) => {
	const { id, body, userName, createdAt, comments, commentsCount, likes, likesCount } = props.post
	return (
		<div className='card-layout'>
			<div className='card-header'>
				<div className='card-title'>{userName}</div>
			</div>
			<div className='card-body'>{body}</div>
			<div className='card-footer'>
				<span>Likes: {likesCount}</span>
				<span>Comments: {commentsCount}</span>
			</div>
		</div>
	)
}

export default Card
