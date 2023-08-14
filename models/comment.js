const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      ref: "User",
      required: [true, "El ID de usuario es obligatorio."],
    },
    content: {
      type: Schema.Types.String,
      required: [true, "El contenido del comentario es obligatorio."],
    },
  },
  { timestamps: true }
);

module.exports = model("Comment", CommentSchema);
