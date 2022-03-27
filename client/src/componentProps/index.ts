export type postsProps = {
	posts: post[]
}
export type cardProps = {
	post: post
}

export type post = {
	id: string
	userName: string
	body: string
	createdAt: string
	comments: comment[]
	likes: like[]
	likesCount: number
	commentsCount: number
}

export type comment = {
	id: string
	userName: string
	body: string
	createdAt: string
}

export type like = {
	id: string
	createdAt: string
	userName: string
}
