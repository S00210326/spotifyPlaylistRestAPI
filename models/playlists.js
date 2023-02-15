const mongoose = require("mongoose");
const Joi = require('joi');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }
  ],
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'calm', 'energetic', 'chill']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
const Playlist = mongoose.model('Playlist', playlistSchema);
function validatePlaylist(playlist) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    songs: Joi.array().items(Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))),
    mood: Joi.string()
      .valid('happy', 'sad', 'angry', 'calm', 'energetic', 'chill')
      .required(),
    user: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    dateCreated: Joi.date(),
  });

  return schema.validate(playlist);
}



module.exports = { Playlist, validatePlaylist};
