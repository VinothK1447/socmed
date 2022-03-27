import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

const client = new ApolloClient({
	uri: '//localhost:4000',
	cache: new InMemoryCache()
})
ReactDOM.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ApolloProvider>,
	document.getElementById('root')
)
reportWebVitals()
