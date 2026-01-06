import express from 'express'; 
const yearRoutes = express.Router();

// Controller to fetch years dynamically
yearRoutes.get("/years", (req, res) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years
  res.json(years);
});

export default yearRoutes; 
