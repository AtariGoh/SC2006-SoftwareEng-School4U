require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);



const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173", // Local development
];

const net = require('net');  // 用于检查端口是否被占用


const supabaseUrl = process.env.SUPABASE_URL1;
const supabaseKey = process.env.SUPABASE_KEY1;
const supabase = createClient(supabaseUrl, supabaseKey);

// 打印确认 Supabase URL 和 Key
console.log('Supabase URL:', supabaseUrl);  
console.log('Supabase Key:', supabaseKey);  

// 导出 Supabase 客户端实例
module.exports = supabase;
*/
const allowedOrigins = [
    "http://localhost:5173", // Local development
  ];
  
// 导入路由
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );
  

/// import jwt verification function which stores user_id
const verifyToken = require('./Auth')

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

// Import the getSchoolData function
const getSchoolData = require('./database/getSchools');
const getCCAData = require('./database/getCCAs');
const getDistProgData = require('./database/getDistProg');
const getSubjectsData = require('./database/getSubjects');
const getMOEProgramsData = require('./database/getMOEProg');

// Update route definition to match the frontend
// Update route definition to match the frontend
app.get('/api/schools', async (req, res) => {
    try {
      // Use Promise.all to fetch both datasets concurrently

      const queryParamsName =  req.query.query
      const queryParamsLevel = req.query.level;
      const queryParamsLocation = req.query.location
      const querySort = req.query.sortBy;
      const queryNameLevel = {
        name: queryParamsName,
        level: queryParamsLevel,
        location: queryParamsLocation,
        sort: querySort
      };

      console.log("what the",req.query)
      const [schoolData, ccaData, distProgData, subjectsData, moeprogData] = await Promise.all([
        getSchoolData(queryNameLevel),
        getCCAData(req.query), 
        getDistProgData(req.query),
        getSubjectsData(req.query),
        getMOEProgramsData(queryParamsName)
      ]);
  
      // Log two examples to check what’s being sent to the client
      console.log("Example school data being sent to frontend:", schoolData.slice(0, 2));
      //console.log("Example CCA data being sent to frontend:", ccaData.slice(0, 2));
      //console.log("Example distProg data being sent to frontend:", distProgData.slice(0, 2)); 
      //console.log("Example subjects data being sent to frontend:", subjectsData.slice(0, 2)); 
     //console.log("Example MOE programmes data being sent to frontend:", moeprogData.slice(0, 2)); 
  
      // Return both datasets in a structured response
      res.json({ schools: schoolData, ccas: ccaData, distProgs:distProgData, subjects: subjectsData, moeprog: moeprogData }); // Send a single object
    } catch (error) {
      console.error("Error in /api/schools:", error);  // Add logging for debugging
      res.status(500).json({ error: "Failed to fetch school data" });
    }
  });
  


  app.post('/api/addToFav',verifyToken, async(req,res)=>{
    try {
      const school_name = req.body.data;
      console.log('Request Body:', school_name);
      const user_id = req.userId;
      console.log("id", user_id)
      const { data, error } = await supabase
        .from('fav_schools')
        .insert([{ school_name, user_id }]);
  
      return res.status(200).json({message:"Book added to bookshelf"})
    } catch (error) {
      console.error("Supabase Error:", error);
      res.status(500).json({ error: "An error occurred while adding book" });
    }
  })

  app.post('/api/logout', (req, res) => {
    res.clearCookie('accessToken',
      {secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',});
    res.clearCookie('refreshToken',{
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
    
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

