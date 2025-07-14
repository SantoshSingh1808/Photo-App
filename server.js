import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Store photos in /app/photos
const photosDir = '/app/photos';
fs.ensureDirSync(photosDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photosDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|webp/;
    cb(null, allowedTypes.test(file.mimetype));
  },
});

app.use(cors());
app.use('/photos', express.static(photosDir));

app.post('/api/upload', upload.single('photo'), (req, res) => {
  res.json({ message: 'Upload successful', filename: req.file.filename });
});

app.get('/api/photos', (req, res) => {
  fs.readdir(photosDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to list photos' });

    const photoList = files.map(file => ({
      filename: file,
      url: `/photos/${file}`,
    }));

    res.json(photoList);
  });
});

app.delete('/api/photos/:filename', (req, res) => {
  const filePath = path.join(photosDir, req.params.filename);
  fs.remove(filePath)
    .then(() => res.json({ message: 'Deleted' }))
    .catch(() => res.status(500).json({ error: 'Delete failed' }));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
