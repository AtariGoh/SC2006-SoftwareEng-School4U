require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const net = require('net');  // 用于检查端口是否被占用
const cors = require('cors');  // 新增CORS库
/*
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL1;
const supabaseKey = process.env.SUPABASE_KEY1;
const supabase = createClient(supabaseUrl, supabaseKey);

// 打印确认 Supabase URL 和 Key
console.log('Supabase URL:', supabaseUrl);  
console.log('Supabase Key:', supabaseKey);  

// 导出 Supabase 客户端实例
module.exports = supabase;
*/

// 导入路由
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/userLoginSignUp');
const PSGChatRoutes = require('./routes/PSGChatRoute');
const aftPriChatRoutes = require('./routes/aftPriChatRoutes');
const aftSecChatRoutes = require('./routes/aftSecChatRoute');
const reviewRoutes = require('./routes/reviewRoutes');

// Use routes
app.use('/api', authRoutes);
app.use('/api', PSGChatRoutes);
app.use('/api', aftPriChatRoutes);
app.use('/api', aftSecChatRoutes);
app.use('/reviews', reviewRoutes);

// 默认端口
const defaultPort = process.env.PORT || 5000;
const PORT = defaultPort;

// 检测端口是否被占用
function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);  // 端口被占用
      } else {
        reject(err);  // 其他错误
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(true);  // 端口可用
    });

    server.listen(port);
  });
}

// 递增端口直到找到可用端口
async function findAvailablePort(startPort) {
  let currentPort = startPort;
  while (!(await checkPort(currentPort))) {
    console.log(`Port ${currentPort} is in use, trying another one...`);
    currentPort++;
  }
  return currentPort;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

