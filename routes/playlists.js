const express = require("express");
const validationMiddleware = require("../middleware/jwtvalidation");
const { Playlist } = require("../models/playlists");
const { validatePlaylist } = require("../models/playlists");

const Joi = require('joi');


const router = express.Router();

// const upload = multer({dest:'uploads/'}).single("demo_image");
let songs = [];

//POST operation
router.post("/", async (req, res) => {
  let playlist = new Playlist(req.body);

  let result = validatePlaylist(req.body);

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  try {
    playlist = await playlist.save();
    res.location(`${playlist._id}`).status(201).json(playlist);
  } catch (error) {
    res.status(500).send("db_error " + error);
  }
});
  

//get all playlists
router.get("/", async (req, res) => {
  const { mood } = req.query;

  let filter = {};

  if (mood) {
    filter.mood = { $regex: `${mood}`, $options: "i" };
  }

  try {
    const playlists = await Playlist.find(filter).select(
      "name mood user dateCreated"
    );
    res.json(playlists);
  } catch (error) {
    res.status(500).json("db error " + error);
  }
});


//get playlist by id
router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json("Not found");
    }
  } catch (error) {
    res.status(404).json("Not found:id is weird " + error);
  }
});

//delete playlist by id
router.delete("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (playlist) res.status(204).send();
    else res.status(404).json(`playlist with that ID ${req.params.id} was not found`);
  } catch {
    res.status(404).json(`funny id ${req.params.id} was not found`);
  }
});
//update a playlist by id
router.put("/:id", async (req, res) => {
  let result = validatePlaylist(req.body);

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (playlist) res.status(204).json(playlist);
    else res.status(404).send(`playlist with that ID ${req.params.id} was not found`);
  } catch (error) {
    res.status(404).json(`funny id2 ${req.params.id} was not found ` + error);
  }
}); 

module.exports = router;
