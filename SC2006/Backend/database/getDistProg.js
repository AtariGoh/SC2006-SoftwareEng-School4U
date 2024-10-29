
const axios = require('axios');

const distProg = "d_db1faeea02c646fa3abccfa5aba99214"
const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + distProg; 

// Function to get data from the API
async function getDistProgData(queryParams) {
    try {
      const response = await axios.get(`${url}&${queryParams.toString()}`);
      const distprogs = response.data.result.records;
  
      return distprogs.map ((distprog, index) => ({
        id: index + 1,
        school_name: distprog.school_name,
        category: distprog.alp_domain,
        prog_name: distprog.alp_title,
        category_1: distprog.llp_domain1,
        prog_name_1: distprog.llp_title1,
      }));

      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    }
  }
  

module.exports = getDistProgData;
