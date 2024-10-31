const express = require('express');
const axios = require('axios');

const API_KEY = 'AIzaSyBSL1FdwBDJ5SbXDOpdguvatCAg5gZ6SJM';

async function getCoordsForAddress(address) {
    /*init map to singapore if no location found
    return { 
        lat: 1.2202915414, 
        lng: 103.4931975227
    };
    */

    const cachedCoordinates = {};

    const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`
    );

    console.log("check resp",response);

    if (response.data && response.data.results
        && response.data.results[0]) {
           const location = response.data.results[0].geometry.location;
           cachedCoordinates[address] = location;
           console.log(cachedCoordinates[address]);
           return cachedCoordinates[address];
         }
    else{
         console.log('Could not find the location for the school in Singapore.');
            return { lat: 1.27, lng: 103.85 }; // Example default location (Optional)
    }
}
    

module.exports =getCoordsForAddress;