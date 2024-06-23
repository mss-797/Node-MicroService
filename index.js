const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Todo Microservice Proxy
const todoServiceProxy = createProxyMiddleware({
    target: 'https://todo-services-a9jn.onrender.com',
    changeOrigin: true,
    pathRewrite: {
        '^/todo': ''
    }
});

// User Microservice Proxy
const userServiceProxy = createProxyMiddleware({
    target: 'https://auth-services-g6ck.onrender.com',
    changeOrigin: true,
    pathRewrite: {
        '^/user': ''
    }
});

// Use proxies to forward requests
app.use('/todo', todoServiceProxy);
app.use('/user', userServiceProxy);

// Gateway server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Gateway Server is running on port ${PORT}`);
});
