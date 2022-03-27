import React from 'react'
import { useQuery } from '@apollo/client'
import { HOME_PAGE_POSTS } from '../services/home'
import * as TypeProps from '../componentProps'

const Home = () => {
	const { loading, error, data } = useQuery(HOME_PAGE_POSTS)
	return <div>{loading ? <h6>Loading posts...</h6> : data.getPosts && data.getPosts.map((post: TypeProps.post) => !!post && <div key={post.id}>{post.body}</div>)}</div>
}

export default Home
