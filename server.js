import express from 'express';
import path from 'path';
import fs from 'fs'
import mainRoutes from './routes/route.js'

// Express setup
const app = express();
const PORT = 4000;


// Middleware setup
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs')


app.use('/', mainRoutes)

// File and Forlder setup
const uploadsDir = path.join('uploads');
const dataFile = path.join(uploadsDir, 'data.json');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');


app.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));


