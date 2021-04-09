import {Schema,model} from 'mongoose'

const studentSchema = new Schema(
    {
      fname: String,
      lname: String,
      dni: Number,
      address: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Student", studentSchema);