// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import Log from '../models/Log.js';

// // Ensure the uploads directory exists
// export const ensureUploadsDirectory = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// // Configure Multer storage
// export const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const year = new Date().getFullYear();
//     const dir = `../uploads/logs/${year}`;
//     ensureUploadsDirectory(dir); // Ensure the directory exists
//     cb(null, dir); // Directory to save uploaded files
//   },
//   filename: function (req, file, cb) {
//     const plantId = req.body.plantId || 'unknown';
//     const timestamp = Date.now();
//     cb(null, `${plantId}-${timestamp}${path.extname(file.originalname)}`); // Append plantId and timestamp to the filename
//   }
// });

// export const upload = multer({ storage: storage });

// export const createLog = async (data) => {
//   const existingLog = await Log.findOne({ plantId: data.plantId, date: data.date });
//   if (existingLog) {
//     return null; // Ignore if there's already an entry for the same plantId and timestamp
//   }
//   const log = new Log(data);
//   return await log.save();
// };

// export const getLogsByPlantId = async (plantId) => {
//   return await Log.find({ plantId });
// };

// export const updateLogById = async (id, updateData) => {
//   return await Log.findByIdAndUpdate(id, updateData, { new: true });
// };

// export const deleteLogById = async (id) => {
//   return await Log.findByIdAndDelete(id);
// };
