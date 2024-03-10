// app.js
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory

app.use(express.static(path.join(__dirname)));
// app.use(express.static(path.join(__dirname,"الامتحان الشامل الاول")));

app.get('/:exam', (req, res) => {
    
    
    res.sendFile(path.join(__dirname,req.params.exam, 'index.html'));
});






// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
