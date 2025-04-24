import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../uploads/data.json');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get('/', (req, res) => {
  const images = JSON.parse(fs.readFileSync(dataPath));
  res.render('index', { images });
});

router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const images = JSON.parse(fs.readFileSync(dataPath));
  images.push({ filename: req.file.filename, 
  uploadedAt: new Date().toISOString()});
  
  fs.writeFileSync(dataPath, JSON.stringify(images, null, 2));
  res.redirect('/');
});

router.get('/gallery', (req, res) => {
  const images = JSON.parse(fs.readFileSync(dataPath));
  res.render('gallery', { images });
});

export default router;
