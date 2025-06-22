const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const commandPath = path.join('/tmp', 'command.json');

// בדיקת תקינות
app.get('/', (req, res) => {
  res.send('✅ MCP Server is running on Render');
});

// קבלת פקודה מה-GPT ושמירה לקובץ
app.post('/api/command', (req, res) => {
  const command = req.body;

  fs.writeFile(commandPath, JSON.stringify(command, null, 2), (err) => {
    if (err) {
      console.error('❌ Failed to save command:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to save command' });
    }

    console.log('✅ MCP command saved to command.json');
    res.status(200).json({ status: 'ok', saved: true });
  });
});

// שליפה של הפקודה האחרונה
app.get('/api/command', (req, res) => {
  fs.readFile(commandPath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ No command file found.');
      return res.status(404).json({ status: 'error', message: 'No command file found' });
    }

    res.status(200).json({
      status: 'ok',
      command: JSON.parse(data)
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 MCP Server is listening on port ${port}`);
});
