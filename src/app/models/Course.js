const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    video: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

//Custom query helpers
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};

// Add plugin
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Course", CourseSchema);
