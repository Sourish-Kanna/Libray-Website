import mongoose, {Schema} from "mongoose";

const syllabusSchema = new Schema({
    branch: {
        type: String,
        // enum: [
        //     'Computer Engineering',
        //     'Electronics and Telecommunication',
        //     'Electronics and Computer Science',
        //     'Information Technology',
        //     'Mechanical Engineering',
        //     'AIDS',
        //     'AIML',
        //     'CS IOT',
        //     'First Year Engineering'
        // ],
        required: true
    },
    semester: {
        type: String,
        // enum: ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5', 'SEM 6', 'SEM 7', 'SEM 8'],
        required: true
    },
    syllabusUrl: {
        type: String,
        required: true
    }
},{
    timestamps:true
});

export const Syllabus = mongoose.model('Syllabus', syllabusSchema);

