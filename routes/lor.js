const router = require("express").Router();
const Students = require("../models/Students");
const Lor = require("../models/LOR");
const cloudinary = require("../utils/cloudinary");

router.post("/newLor/:id", async (req, res) => {
  const sid = req.params.id;
  const student = await Students.findOne({
    _id: sid,
  });
  const {
    date,
    yearpassing,
    year,
    marks,
    percentage,
    year1,
    marks1,
    percentage1,
    year2,
    marks2,
    percentage2,
    year3,
    marks3,
    percentage3,

    exam,
    enrollno,
    score,
    result,
    faculty,
    program,
    university,
    branch,
    div,
    country,
  } = req.body;
  try {
    // const result = await cloudinary.uploader.upload(file, {
    //   folder: "extra_curricular/",
    // });
    const newExtra = new Lor({
      name: student.fullname,
      date,
      yearpassing,
      sid: student._id,
      sname: student.fullname,
      rollno: student.rollno,
      contact: student.mobile_no,
      email: student.mail,
      parentemail: student.father_mail,
      parentcontact: student.father_contact,
      address: student.permenant_Address,
      passportphoto: student.profile.url,
      year,
      marks,
      percentage,
      year1,
      marks1,
      percentage1,
      year2,
      marks2,
      percentage2,
      year3,
      marks3,
      percentage3,

      exam,
      enrollno,
      score,
      result,
      faculty,
      program,
      university,
      branch,
      div,
      country,
      status: "Pending",
    });
    const extra = await newExtra.save();
    res.status(200).json(extra);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get by teachers id
router.get("/getbytid/:tid", async (req, res) => {
  try {
    const faculty = req.params.tid;
    const facultyid = faculty.split("@")[0] + "@pict.edu";
    const lors = await Lor.find( {faculty: facultyid} );
    res.status(200).json(lors);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//update status
router.put("/updatestatusR/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const lor = await Lor.findByIdAndUpdate({_id: id},{status: "Rejected"})
    res.status(200).json("Status Updated Successfully");
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})
router.put("/updatestatusA/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const lor = await Lor.findByIdAndUpdate({_id: id},{status: "Approved"})
    res.status(200).json("Status Updated Successfully");
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

router.get("/getbysid/:id", async (req, res) => {
  const sid = req.params.id;
  try {
    const amcats = await Lor.find({ sid: sid });
    res.status(200).json(amcats);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/getbybatch/:batch", async (req, res) => {
  const sbatch = req.params.batch;
  try {
    const amcats = await Lor.find({ sbatch });
    res.status(200).json(amcats);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/getbydiv/:div", async (req, res) => {
  const sdiv = req.params.div;
  try {
    const amcats = await Lor.find({ sdiv });
    res.status(200).json(amcats);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/deleteLOR/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Lor.findOneAndDelete({ _id: id });
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
