// backend/database/getCCAs.js
const axios = require('axios');

const CCAdata = "d_9aba12b5527843afb0b2e8e4ed6ac6bd"
const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + CCAdata; 

// Function to get data from the API
async function getCCAData(queryParamsCCA) {
    try {
      const modifiedQueryParamsCCA = queryParamsCCA.replace(/\b(primary|secondary)\s+school\b/gi, '$1');
      const queryString = JSON.stringify({ school_name: modifiedQueryParamsCCA }); 
      const response = await axios.get(`${url}&q=${queryString}`); 

      const ccas = response.data.result.records || []; // Default to an empty array if records are undefined
  
      return ccas.length > 0 
        ? ccas.map((cca, index) => ({
            id: index + 1,
            school_name: cca.school_name,
            school_section: cca.school_section,
            category: cca.cca_grouping_desc,
            cca_name: cca.cca_generic_name,
          }))
        : []; // Return an empty array if ccas has no records
      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getCCAData;
