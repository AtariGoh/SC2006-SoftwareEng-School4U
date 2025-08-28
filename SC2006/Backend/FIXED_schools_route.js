// FIXED VERSION OF /api/schools ROUTE
// Replace lines 58-103 in your server.js with this:

app.get('/api/schools', async (req, res) => {
    try {
      console.log('🔍 /api/schools endpoint called');
      console.log('📋 Request query parameters:', req.query);

      // Handle empty/undefined query parameters properly
      const queryParamsName = req.query.query || '';
      const queryParamsLevel = req.query.level || '';
      const queryParamsLocation = req.query.location || '';
      const querySort = req.query.sortBy || 'name-asc';
      
      const queryNameLevel = {
        name: queryParamsName.trim(),
        level: queryParamsLevel.trim(),
        location: queryParamsLocation.trim(),
        sort: querySort
      };
      
      const queryParamsCCA = req.query.ccas || '';
      const queryParamsSubjects = req.query.subjects || '';
      const queryParamsProg = req.query.distProgs || '';

      console.log("📊 Processed request parameters:", {
        name: queryParamsName,
        level: queryParamsLevel,
        location: queryParamsLocation,
        sortBy: querySort,
        ccas: queryParamsCCA,
        subjects: queryParamsSubjects,
        distProgs: queryParamsProg
      });

      console.log('🚀 Starting parallel data fetch...');
      const startTime = Date.now();

      // Use Promise.allSettled to prevent one failure from crashing everything
      const results = await Promise.allSettled([
        getSchoolData(queryNameLevel),
        getCCAData(queryParamsName), 
        getDistProgData(queryParamsName),
        getSubjectsData(queryParamsName),
        getMOEProgramsData(queryParamsName)
      ]);

      const fetchTime = Date.now() - startTime;
      console.log(`⏱️ All data fetch attempts completed in ${fetchTime}ms`);

      // Extract results or use empty arrays for failed requests
      const schoolData = results[0].status === 'fulfilled' ? results[0].value : [];
      const ccaData = results[1].status === 'fulfilled' ? results[1].value : [];
      const distProgData = results[2].status === 'fulfilled' ? results[2].value : [];
      const subjectsData = results[3].status === 'fulfilled' ? results[3].value : [];
      const moeprogData = results[4].status === 'fulfilled' ? results[4].value : [];

      // Log any failures
      results.forEach((result, index) => {
        const names = ['schools', 'ccas', 'distProgs', 'subjects', 'moeprog'];
        if (result.status === 'rejected') {
          console.warn(`⚠️ ${names[index]} fetch failed:`, result.reason?.message);
        }
      });

      console.log('📊 Data summary:', {
        schools: schoolData?.length || 0,
        ccas: ccaData?.length || 0,
        distProgs: distProgData?.length || 0,
        subjects: subjectsData?.length || 0,
        moeprog: moeprogData?.length || 0
      });
  
      // Return datasets in a structured response
      const response = { 
        schools: schoolData || [], 
        ccas: ccaData || [], 
        distProgs: distProgData || [], 
        subjects: subjectsData || [], 
        moeprog: moeprogData || [],
        meta: {
          fetchTime: fetchTime,
          timestamp: new Date().toISOString(),
          query: queryNameLevel
        }
      };
      
      console.log('✅ Successfully returning school data');
      res.json(response);
      
    } catch (error) {
      console.error("❌ Critical error in /api/schools:", {
        error: error.message,
        stack: error.stack,
        query: req.query,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ 
        error: "Failed to fetch school data",
        details: error.message,
        timestamp: new Date().toISOString(),
        requestId: Date.now()
      });
    }
  });
