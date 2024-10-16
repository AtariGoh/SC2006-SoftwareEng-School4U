const datasetId = {
    "CCA": "d_9aba12b5527843afb0b2e8e4ed6ac6bd",               // Co-curricular activities (CCAs)
    "genInfo": "d_688b934f82c1059ed0a6993d2a829089",           // General Information of Schools
    "MOE": "d_b0697d22a7837a4eddf72efb66a36fc2",               // MOE programmes
    "distProg": "d_db1faeea02c646fa3abccfa5aba99214",          // School Distinctive Programmes
    "Subjects": "d_f1d144e423570c9d84dbc5102c2e664d"           // Subjects Offered
  };
  <script></script>
  const baseUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=' + datasetId["genInfo"];
  
  // Example query parameters to limit results and filter
  const queries = new URLSearchParams({
    limit: 9999,  // Set a large limit (as high as the API allows)
    'filters[school_name]': 'RULANG PRIMARY SCHOOL',  // Filter by SCHOOL_NAME
    fields: 'school_name, email_address',
  });
  
  const urlWithQueries = baseUrl + '&' + queries.toString();
  
  fetch(urlWithQueries)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched Records:', data.result.records);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  