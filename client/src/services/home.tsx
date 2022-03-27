import { gql } from '@apollo/client'

export const HOME_PAGE_POSTS = gql`
	query getPosts {
		getPosts {
			id
			body
			userName
			createdAt
			likesCount
			commentsCount
		}
	}
`
