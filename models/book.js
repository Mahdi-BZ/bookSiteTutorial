const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

bookSchema.virtual("coverImageData").get(function() {
  if (this.coverImage && this.coverImageType) {
    let base64ImageData = this.coverImage.toString("base64");
    return `data:${this.coverImageType};charset=utf-8;base64,${base64ImageData}`;
  }
});

module.exports = mongoose.model("Book", bookSchema);
