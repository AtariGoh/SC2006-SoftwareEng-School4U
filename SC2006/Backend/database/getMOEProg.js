
const axios = require('axios');

const moeprogs = "d_b0697d22a7837a4eddf72efb66a36fc2"
const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + moeprogs; 

// Function to get data from the API
async function getMOEProgramsData(queryParams) {
    try {
      const response = await axios.get(`${url}&${queryParams.toString()}`);
      const moeprogs = response.data.result.records;
  
      return moeprogs.map ((moeprog, index) => ({
        id: index + 1,
        school_name: moeprog.school_name,
        category: moeprog.moe_programme_desc,
      }));

      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getMOEProgramsData;
