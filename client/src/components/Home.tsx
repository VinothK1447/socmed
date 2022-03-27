import React from 'react'
import { useQuery } from '@apollo/client'
import { HOME_PAGE_POSTS } from '../services/home'
import * as TypeProps from '../componentProps'
import Card from './Card'

const Home = () => {
	const { loading, error, data } = useQuery(HOME_PAGE_POSTS)
	return (
		<div className={'posts'}>
			{loading ? (
				<h1>Loading posts...</h1>
			) : (
				data.getPosts &&
				data.getPosts.map(
					(post: TypeProps.post) =>
						!!post && (
							<div key={post.id}>
								<Card post={post} />
							</div>
						)
				)
			)}
		</div>
	)
}

export default Home
