const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    min:1,
    max:5
  }
});

const ratingSchema = new mongoose.Schema({
  star1: starSchema,
  star2: starSchema,
  star3: starSchema,
  star4: starSchema,
  star5: starSchema,
  star6: starSchema,
  star7: starSchema,
  star8: starSchema,
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
