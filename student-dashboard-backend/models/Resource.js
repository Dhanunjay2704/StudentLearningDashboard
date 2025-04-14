const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filePath: { type: String, required: true }, // Path to the uploaded file
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Associated course
});

module.exports = mongoose.model('Resource', resourceSchema);


// const mongoose = require('mongoose');

// const resourceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   filePath: { type: String, required: true },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   }
// });

// module.exports = mongoose.model('Resource', resourceSchema);