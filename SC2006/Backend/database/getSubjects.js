
const axios = require('axios');

const subjects = "d_f1d144e423570c9d84dbc5102c2e664d"
const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + subjects; 

// Function to get data from the API
async function getSubjectsData(queryParams) {
    try {
      const response = await axios.get(`${url}&${queryParams.toString()}`);
      const subjects = response.data.result.records;
  
      return subjects.map ((subject, index) => ({
        id: index + 1,
        school_name: subject.SCHOOL_NAME,
        category: subject.SUBJECT_DESC,
      }));

      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getSubjectsData;
