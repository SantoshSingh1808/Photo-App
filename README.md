# PhotoVault - Photo Upload Web Application

A beautiful, modern photo upload and management application built with React, TypeScript, and Node.js. Upload, view, and manage your photos with an intuitive drag-and-drop interface and responsive grid layout.

![PhotoVault Screenshot](https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **File Browser Fallback**: Click to browse files if drag-and-drop isn't preferred
- **Responsive Grid Layout**: Beautiful photo grid that adapts to all screen sizes
- **Photo Management**: View, download, and delete uploaded photos
- **File Validation**: Automatic validation for image files with size limits
- **Real-time Feedback**: Loading states and visual feedback throughout the app
- **Modern UI**: Clean, professional design with smooth animations

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast development and building

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Multer** - File upload handling
- **fs-extra** - Enhanced file system operations
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photo-upload-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   
   In one terminal, start the backend server:
   ```bash
   npm run server
   ```
   
   In another terminal, start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
photo-upload-app/
├── src/
│   ├── components/
│   │   ├── PhotoGrid.tsx      # Photo display grid component
│   │   └── UploadArea.tsx     # File upload component
│   ├── hooks/
│   │   └── usePhotos.ts       # Custom hook for photo operations
│   ├── App.tsx                # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── photos/                   # Uploaded photos storage (auto-created)
├── server.js                 # Express backend server
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🎯 Usage

### Uploading Photos

1. **Drag and Drop**: Simply drag image files onto the upload area
2. **File Browser**: Click the "Choose File" button to browse and select images
3. **Supported Formats**: JPG, JPEG, PNG, GIF, BMP, WebP
4. **Size Limit**: Maximum 5MB per file

### Managing Photos

- **View**: Photos are displayed in a responsive grid layout
- **Download**: Hover over a photo and click the download icon
- **Delete**: Hover over a photo and click the trash icon (with confirmation)
- **Info**: Photo filename is displayed on hover

## 🔧 API Endpoints

### Upload Photo
```
POST /api/upload
Content-Type: multipart/form-data
Body: photo file
```

### Get All Photos
```
GET /api/photos
Response: Array of photo objects with filename and URL
```

### Delete Photo
```
DELETE /api/photos/:filename
Response: Success/error message
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by modifying the classes in the components or extending the Tailwind configuration in `tailwind.config.js`.

### File Storage
Photos are stored in the `/photos` directory by default. You can change this by modifying the `photosDir` variable in `server.js`.

### Upload Limits
Modify the upload limits in `server.js`:
```javascript
limits: {
  fileSize: 5 * 1024 * 1024 // 5MB limit
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
The frontend can be deployed to Netlify. The built files will be in the `dist` directory.

**Note**: For full functionality including file uploads, you'll need to deploy the backend server separately to a service like Heroku, Railway, or DigitalOcean.

## 🔒 Security Considerations

- File type validation prevents non-image uploads
- File size limits prevent large file attacks
- CORS is configured for cross-origin requests
- Input sanitization for file names

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**
   - Ensure the backend server is running on port 3001
   - Check that CORS is properly configured

2. **Photos not displaying**
   - Verify the `/photos` directory exists and has proper permissions
   - Check that the backend server can serve static files

3. **Upload failures**
   - Confirm file size is under 5MB
   - Ensure file is a valid image format
   - Check server logs for detailed error messages

## 📝 Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Stock photos from [Pexels](https://www.pexels.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**Made with ❤️ by Bolt**