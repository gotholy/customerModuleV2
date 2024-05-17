import mongoose from "mongoose";

// ContactPerson schema
const contactPersonSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxlength: 50 },
    last_name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 50, unique: true },
    mobile_phone: { type: String, required: true, maxlength: 20 },
    birth_date: { type: Date, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
});

contactPersonSchema.pre('deleteOne', async function (next) {
    try {
      const contactPersonId = this.getQuery()._id;
      await Customer.updateMany(
        { contact_persons: contactPersonId },
        { $pull: { contact_persons: contactPersonId } }
      );
      next();
    } catch (error) {
      next(error);
    }
  });

export default mongoose.model('ContactPerson', contactPersonSchema);