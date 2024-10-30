
const axios = require('axios');

const distProg = "d_db1faeea02c646fa3abccfa5aba99214"
const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + distProg; 

// Function to get data from the API
async function getDistProgData(queryParams) {
    try {
      const queryString = JSON.stringify({ school_name: queryParams }); 
      const response = await axios.get(`${url}&q=${queryString}`); 

  
      const distprogs = response.data.result.records || []; // Default to an empty array if records are undefined
  
      return distprogs.length > 0
        ? distprogs.map((distprog, index) => ({
            id: index + 1,
            school_name: distprog.school_name,
            category: distprog.alp_domain,
            prog_name: distprog.alp_title,
            category_1: distprog.llp_domain1,
            prog_name_1: distprog.llp_title1,
          }))
        : []; 
      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getDistProgData;
