const router = require("express").Router();
const { Song, validate } = require("../models/song");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const artist = require("../middleware/artist")
const path = require("path");
const validateObjectId = require("../middleware/validateObjectId");
const multer = require("multer");

// Configure Multer for file uploads (store files in "uploads" folder)
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with the original name
  },
});

const upload = multer({ storage: storage });


// Create song with file upload (audio + image)
router.post(
  "/",
  [admin, upload.fields([{ name: "song" }, { name: "img" }])],
  async (req, res) => {
    try {
      const songFile = req.files["song"][0]; // Access uploaded song file
      const imgFile = req.files["img"][0]; // Access uploaded image file

      // Create the song object with file paths and other data
      const songData = {
        name: req.body.name,
        artist: req.body.artist,
        song: songFile.path, // Store file path in database
        img: imgFile.path, // Store file path in database
      };

      const { error } = validate(songData); // Validate input
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const song = new Song(songData); // Save to DB
      await song.save();
      res
        .status(201)
        .send({ data: song, message: "Song created successfully" });
    } catch (error) {
      console.error("Error creating song:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);
router.post(
  "/artist",
  [ upload.fields([{ name: "song" }, { name: "img" }])],
  async (req, res) => {
    try {
      const songFile = req.files["song"][0]; // Access uploaded song file
      const imgFile = req.files["img"][0]; // Access uploaded image file

      // Create the song object with file paths and other data
      const songData = {
        name: req.body.name,
        artist: req.body.artist,
        song: songFile.path, // Store file path in database
        img: imgFile.path, // Store file path in database
      };

      const { error } = validate(songData); // Validate input
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const song = new Song(songData); // Save to DB
      await song.save();
      res
        .status(201)
        .send({ data: song, message: "Song created successfully" });
    } catch (error) {
      console.error("Error creating song:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

// Get all songs
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.status(200).send({ data: songs });
});

// Get song by ID
router.get("/:id", [validateObjectId, auth], async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({ message: "Song not found" });

    res.status(200).send({ data: song });
  } catch (error) {
    console.error("Error fetching song:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Update song
router.put("/:id", [validateObjectId, admin], async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send({ data: song, message: "Updated song successfully" });
});

// Delete song by ID
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Song deleted successfully" });
});

module.exports = router;
