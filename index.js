const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Todo Microservice Proxy
const todoServiceProxy = createProxyMiddleware({
    target: 'http://localhost:9090',//process.env.TODO_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/todo': ''
    }
});

// User Microservice Proxy
const userServiceProxy = createProxyMiddleware({
    target: 'http://localhost:8080',//process.env.AUTH_URL,
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
