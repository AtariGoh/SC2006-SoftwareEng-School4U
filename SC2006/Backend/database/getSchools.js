// backend/database/getSchools.js
const axios = require('axios');
const getCoordsForAddress = require('../database/location');

const datasetId = {
  "genInfo": "d_688b934f82c1059ed0a6993d2a829089",  // General Information of Schools
};
const baseUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=' + datasetId["genInfo"];

// Function to get data from the API
async function getSchoolData(queryParams) {
    try {
      const queryObject = {}
      if (queryParams.name) {
        queryObject.school_name = queryParams.name;
      }
      if (queryParams.level) {
        queryObject.mainlevel_code = queryParams.level;
      }

      if (queryParams.location) {
        queryObject.zone_code = queryParams.location;
      }
      const queryString = JSON.stringify(queryObject);
      console.log(queryString)
      console.log(`${baseUrl}&q=${queryString}`)
      const response = await axios.get(`${baseUrl}&q=${queryString}`);
      console.log(`${baseUrl}&q=${queryString}`)
      const schools = response.data.result.records;
      console.log(queryParams.sort)

      if (queryParams.sort == "name-desc"){
        return schools.reverse().map((school, index) => ({
          id: index + 1,
          school_name: school.school_name,
          url_address: school.url_address,
          address: school.address,
          postal_code: school.postal_code,
        }));
      }
      else{
        return schools.map((school, index) => ({
          id: index + 1,
          school_name: school.school_name,
          url_address: school.url_address,
          address: school.address,
          postal_code: school.postal_code,
        }));
      }

      let coordinates;
      try{
        coordinates = await getCoordsForAddress(school.address);
      }catch(error){
      return next(error);
    }
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch school data.");
    } 
  }
  

module.exports = getSchoolData;
