// import mongoose from 'mongoose';
// import AutoIncrementFactory from 'mongoose-sequence';

// const AutoIncrement = AutoIncrementFactory(mongoose);

// const PlantSchema = new mongoose.Schema({
//     gender: { type: String, required: true },
//     strain: { type: String, required: true },
//     category: { type: String, required: true },
//     plantingDate: { type: Date, required: true },
//     cloneStage: { type: String },
//     parentPlantId: { type: Number }
// });

// PlantSchema.plugin(AutoIncrement, { inc_field: 'id' });

// const Plant = mongoose.model('Plant', PlantSchema);

// export default Plant;