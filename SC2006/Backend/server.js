import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import cors

const app = express();
const PORT = 3000; // Define the port

// Enable CORS for requests from localhost:5173
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from this origin
  }));

// Endpoint to fetch filtered data
app.get('/api/search', async (req, res) => {
  const { school_name, programme_type, MOE_programme } = req.query;

  const datasetId = "d_688b934f82c1059ed0a6993d2a829089"; // General Info dataset
  const baseUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}`;

  const queryParams = new URLSearchParams({ limit: 9999 });

  // Add dynamic filters if present
  if (school_name) queryParams.append('filters[school_name]', school_name);
  if (programme_type) queryParams.append('filters[programme_type]', programme_type);
  if (MOE_programme) queryParams.append('filters[MOE_programme]', MOE_programme);

  try {
    const response = await fetch(`${baseUrl}&${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    res.json(data.result.records);
  } catch (error) {
    res.status(500).send('Error fetching data: ' + error.message);
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
