// backend/database/getSchools.js
const axios = require('axios');

const datasetId = {
  "genInfo": "d_688b934f82c1059ed0a6993d2a829089",  // General Information of Schools
};
const baseUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=' + datasetId["genInfo"];

// Function to get data from the API
async function getSchoolData(queryParams) {
    try {
      const response = await axios.get(`${baseUrl}&${queryParams.toString()}`);
      const schools = response.data.result.records;
  
      return schools.map((school, index) => ({
        id: index + 1,
        school_name: school.school_name,
        url_address: school.url_address,
        address: school.address,
        postal_code: school.postal_code,
      }));

      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getSchoolData;
