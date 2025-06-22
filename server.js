const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// בדיקה פשוטה ב-GET
app.get('/', (req, res) => {
  res.send('✅ MCP Server is running on Render');
});

// קבלת פקודת MCP מ-GPT ושמירתה לקובץ command.json
app.post('/api/command', (req, res) => {
  const command = req.body;
  const filePath = path.join('/tmp', 'command.json'); // תיקייה זמנית בענן Render

  fs.writeFile(filePath, JSON.stringify(command, null, 2), (err) => {
    if (err) {
      console.error('❌ Failed to save command:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to save command' });
    }

    console.log('✅ MCP command saved to command.json');
    res.status(200).json({ status: 'ok', saved: true });
  });
});

// (אופציונלי) ניתן להוסיף גם GET לקריאת הקובץ אם תרצה

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 MCP Server is listening on port ${port}`);
});
