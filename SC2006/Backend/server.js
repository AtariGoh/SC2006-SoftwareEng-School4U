const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());


// Import routes
const authRoutes = require('./routes/userLoginSignUp');
const PSGChatRoutes = require('./routes/PSGChatRoute');
const aftPriChatRoutes = require('./routes/aftPriChatRoutes');
const aftSecChatRoutes = require('./routes/aftSecChatRoute');

// Use routes
app.use('/api', authRoutes);
app.use('/api', PSGChatRoutes);
app.use('/api', aftPriChatRoutes);
app.use('/api', aftSecChatRoutes);

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
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
