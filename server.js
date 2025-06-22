const express = require('express');
const app = express();

app.use(express.json());

// GET לבדיקה
app.get('/', (req, res) => {
  res.send('✅ MCP Server is running on Render');
});

// POST לקבלת פקודות מ-GPT
app.post('/api/command', (req, res) => {
  console.log('📥 Received MCP command:');
  console.log(req.body);

  // כאן תוכל בעתיד לשמור לקובץ, לשלוח ל-Revit וכו'
  res.status(200).json({
    status: 'ok',
    received: req.body
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 MCP Server is listening on port ${port}`);
});
