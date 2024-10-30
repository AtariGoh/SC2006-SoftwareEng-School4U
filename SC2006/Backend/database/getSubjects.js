
const axios = require('axios');

const subjects = "d_f1d144e423570c9d84dbc5102c2e664d"
const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + subjects; 

// Function to get data from the API
async function getSubjectsData(queryParams) {
    try {
      const queryString = JSON.stringify({ SCHOOL_NAME: queryParams }); 
      const response = await axios.get(`${url}&q=${queryString}`);
      const subjects = response.data.result.records || []; // Default to an empty array if records are undefined
  
      return subjects.length > 0
        ? subjects.map((subject, index) => ({
            id: index + 1,
            school_name: subject.SCHOOL_NAME,
            category: subject.SUBJECT_DESC,
          }))
        : []; // Return an empty array if subjects has no records
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getSubjectsData;
