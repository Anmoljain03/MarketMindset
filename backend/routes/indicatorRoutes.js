const express = require("express");
const router = express.Router();
const Indicator = require("../models/Indicator");
const IndicatorUser = require("../models/IndicatorUser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

// ✅ Modified fileFilter — accept all file types
const fileFilter = (req, file, cb) => {
  console.log("Uploaded file type:", file.mimetype);
  cb(null, true); // Accept all files regardless of MIME type
};

const upload = multer({ storage, fileFilter });

// ============================
// Routes Start
// ============================

// GET all indicators
router.get("/", async (req, res) => {
  const indicators = await Indicator.find();
  res.json(indicators);
});

// GET specific indicator
router.get("/:id", async (req, res) => {
  try {
    const indicator = await Indicator.findById(req.params.id);
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }
    res.json(indicator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new indicator
router.post("/", upload.fields([{ name: "image" }, { name: "file" }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.files?.image?.[0]?.filename;
    const file = req.files?.file?.[0]?.filename;

    const newIndicator = new Indicator({
      title,
      description,
      image,
      downloadFileUrl: file,
    });

    await newIndicator.save();
    res.status(201).json(newIndicator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update indicator
router.put("/:id", upload.fields([{ name: "image" }, { name: "file" }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.files?.image?.[0]?.filename) {
      updateData.image = req.files.image[0].filename;
    }
    if (req.files?.file?.[0]?.filename) {
      updateData.downloadFileUrl = req.files.file[0].filename;
    }

    const updated = await Indicator.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE indicator
router.delete("/:id", async (req, res) => {
  await Indicator.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// GET to download PDF file by filename
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).json({ error: "File download failed" });
    }
  });
});

// ============================
// Routes End
// ============================

module.exports = router;
