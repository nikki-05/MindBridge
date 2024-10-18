const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");

exports.ScheduleMeeting  = async(req,res)=>{
	try{
		const {courseId,time} = req.body;
		if(!courseId){
			return res.status(404).json({
				success: true,
				message : "courseId is missing"
			})
		}
		const courseDetails = await Course.findById(courseId).populate("studentsEnroled").exec();
		console.log("courseDetails -> ",courseDetails);
		const studentsEnrolled = courseDetails.studentsEnroled;

		studentsEnrolled.map((student)=>{
			mailSender(student.email,`Meeting Scheduled`,`Meeting has been scheduled for the course ${courseDetails.courseName} on ${time} and the joining link is given below: \n${link}`)
		});
		
		return res.status.json({
			success: true,
			message: "successfully share the meeting details"
		})
	}catch(err){
		return res.status(500).json({
			success: true,
			message: "Some error in scheduling the meeting."
		})
	}
}