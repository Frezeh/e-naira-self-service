import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore'; 
import { QueryClient, QueryClientProvider } from "react-query";

const store = ConfigureStore();

// const client = new ApolloClient({
//   // uri: 'https://71z1g.sse.codesandbox.io/',
//   uri: 'https://api.demo.bittcbdc.com/organization/login/graphql',
//   cache: new InMemoryCache()
// });

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </QueryClientProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
