const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

let mongoose = require('mongoose');


const Student = mongoose.model('Students', {
  _id: {
      type: String,
      required:true
  },
  first_name: {
      type: String,
      required:true
  },
  last_name: {
      type:String,
      required:true
  },
  phone_number: {
      type:String,
      required:true
  },
  email_address: {
      type:String,
      required:true
  },
  course_id: {
      type:String,
      required:true
  },
  year_level: {
      type:String,
      required:true
  },
  faculty: {
      type:String,
      required:true
  },
});

// Get All Students
router.get('/students/all', (req, res) => {
  Student.find({}, (err, data) => {
      if(!err) {
          res.send(data);
      } else {
          console.log(err);
      }
  });
});


// Get a Student
router.get('/students/:id', (req, res) => {
  Student.findById(req.params.id, (err, data) => {
      if(!err) {
          if (!data) {
              res.json({message: 'Matric Number Entered Does Not Exist In Student Collection'});
          }
          
          else {
              res.send(data);
          }
          
      } 
      else {
         console.log(err);
      }
  });
});

//Post a Student Profile
router.post('/students/add', (req, res) => {
  const emp = new Student({
      
      _id: req.body._id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      course_id: req.body.course_id,
      year_level: req.body.year_level,
      faculty: req.body.faculty,

  });
  emp.save((err, data) => {
      if(!err) {
          
          res.json( { message: 'Student Profile Has Been Successfully Added' } );

      } else {
         console.log(err);
      }
  });
});


// Update Student Profile
router.put('/students/update/:id', (req, res) => {

  
  const emp = {

      _id: req.body._id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      course_id: req.body.course_id,
      year_level: req.body.year_level,
      faculty: req.body.faculty,
      
  };
  Student.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
      if(!err) {
          res.status(200).json({code: 200, message: 'Details of Student Profile has been Successfully Updated'})
      } else {
          console.log(err);
      }
  });
});

// Delete Student Profile
router.delete('/students/delete/:id', (req, res) => {

  Student.findByIdAndRemove(req.params.id, (err, data) => {
      if(!err) {
          res.status(200).json({code: 200, message: 'Student Profile has been deleted' })
      } else {
          console.log(err);
      }
  });
});







const fine = mongoose.model('Fine', {

    _id: {
        type: String,
        required:true
    },
    id_officer_on_duty: {
        type: String,
        required:true
    },
    total_fine: {
        type: String,
        required:true
    },
    vehicle_no: {
        type:String,
        required:true
    },
    issued_area: {
        type: String,
        required:true
    },
    fine_no: {
        type: String,
        required:true
    },
    offense_date_time : {
        type: String,
        required:true
    },
    offense_detail : {
        type: String,
        required:true
    },
    fine_amount_RM : {
        type: String,
        required:true
    },
    final_amount_RM : {
        type: String,
        required:true
    },
});

//GET ALL FINES
router.get('/fine/all', (req, res) => {
    fine.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


//GET A FINE BY
router.get('/fine/:id', (req, res) => {
    fine.findById(req.params.id, (err, data) => {
        if(!err) {
            if (!data) {
                res.json({message: 'No outstanding fine for the matrics number entered'})
            }
            
            else {
                res.send(data);
            }
            
        } 
        else {
           console.log(err);
        }
    });
});

//Post a Student
router.post('/fine/add', (req, res) => {
    const emp = new fine({
        
        _id: req.body._id,
        id_officer_on_duty: req.body.id_officer_on_duty,
        total_fine: req.body.total_fine,
        vehicle_no: req.body.vehicle_no,
        issued_area: req.body.issued_area,
        fine_no: req.body.fine_no,
        offense_date_time: req.body.offense_date_time,
        offense_detail: req.body.offense_detail,
        fine_amount_RM: req.body.fine_amount_RM,
        final_amount_RM: req.body.final_amount_RM,  
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Fine has been successfully added'})
        } else {
           console.log(err);
        }
    });
});

// Update Student

router.put('/fine/update/:id', (req, res) => {

    
    const emp = {
        _id: req.body._id,
        id_officer_on_duty: req.body.id_officer_on_duty,
        total_fine: req.body.total_fine,
        vehicle_no: req.body.vehicle_no,
        issued_area: req.body.issued_area,
        fine_no: req.body.fine_no,
        offense_date_time: req.body.offense_date_time,
        offense_detail: req.body.offense_detail,
        fine_amount_RM: req.body.fine_amount_RM,
        final_amount_RM: req.body.final_amount_RM,  
    };
    fine.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Fine has been successfully updated'})
        } else {
            console.log(err);
        }
    });
});

// Delete Student
router.delete('/fine/delete/:id', (req, res) => {

    fine.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Fine has been deleted' })
        } else {
            console.log(err);
        }
    });
});








const officer = mongoose.model('officer_on_duty', {

    _id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    phone_number: {
        type:String,
        required:true
    },
    department: {
        type:String,
        required:true
    },
});


router.get('/officer/all', (req, res) => {
    officer.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// Get An Officer
router.get('/officer/:id', (req, res) => {
    officer.findById(req.params.id, (err, data) => {
        if(!err) {
            if (!data) {
                res.json({message: 'Officer ID entered is not found in Officer Collection'})
            }
            
            else {
                res.send(data);
            }
            
        } 
        else {
           console.log(err);
        }
    });
});

router.post('/officer/add', (req, res) => {
    const emp = new officer({
        
        _id: req.body._id,
        name: req.body.name,
        phone_number: req.body.phone_number,
        department: req.body.department,

    });
    emp.save((err, data) => {
        if(!err) {
           
            res.status(200).json({code: 200, message: 'Officer profile has been successfully added'})
        } else {
           console.log(err);
        }
    });
});

// Update Officer

router.put('/officer/update/:id', (req, res) => {

    
    const emp = {
        _id: req.body._id,
        name: req.body.name,
        phone_number: req.body.phone_number,
        department: req.body.department,
    };
    officer.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Officer profile has been successfully updated'})
        } else {
            console.log(err);
        }
    });
});

// Delete officer
router.delete('/officer/delete/:id', (req, res) => {

    officer.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Officer profile has been successfully deleted' })
        } else {
            console.log(err);
        }
    });
});


module.exports = router;