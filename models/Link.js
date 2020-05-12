const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  from: { type: String, isRequired: true },
  to: { type: String, isRequired: true, unique: true },
  code: { type: String, isRequired: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'Link' }
});

module.exports = model('Link', schema);
