const CV = require('../models/CV');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');


class CvController {
  createCV = function (req, res) {

    let cvFile;
    const FreelancerID = req.body.FreelancerID;
    console.log(FreelancerID)

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    cvFile = req.files.file;
    // console.log("🚀 ~ file: OrderController.js:280 ~ OrderController ~ sampleFile:", cvFile)


    // const uploadPath = '../Prolancer/public/delivery' + deliverFile.name;
    const newFileName = `${FreelancerID}_${cvFile.name}`;
    const commonPath = path.join('uploads', 'other', newFileName);

    // console.log("🚀 ~ file: OrderController.js:26 ~ OrderController ~ uploadPath:", commonPath)
    const uploadPath = path.join(__dirname, '..', '..', commonPath);
    // console.log("🚀 ~ file: OrderController.js:28 ~ OrderController ~ uploadPath:", uploadPath)
    if (fs.existsSync(uploadPath)) {
      // Delete the existing file
      console.log("Run Here")
      fsp.unlink(uploadPath)
        .then(() => {
          console.log('Existing file deleted successfully');
          continueWithFileUpload();
        })
        .catch((unlinkError) => {
          console.error('Error deleting existing file:', unlinkError);
          return res.status(500).json({ error: 'Error deleting existing file.' });
        });
    } else {
      continueWithFileUpload();

    }

    function continueWithFileUpload() {
      cvFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        const filePath = commonPath.replace(/\\/g, '/');
        console.log(newFileName)
        return res.status(200).json(newFileName);
        // console.log("🚀 ~ file: OrderController.js:318 ~ OrderController ~ deliverFile.mv ~ filePath:", filePath);

        // CV.createCV(newFileName, FreelancerID, function (err, result) {
        //   if (err)
        //     return res.status(500).send(err);
        //   else {
        //     console.log("File uploaded successfully Run Here")
        //     if (result.affectedRows == 0) {
        //         return res.send({ message: 'File uploaded Failed' });

        //     }
        //     res.json({ message: 'File uploaded successfully' });

        //   }

        // })
      });
    }

  }

  saveCV = function (req, res) {
    const cv = req.body
    console.log(cv)
    CV.createCV(cv, function (err, results) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
  }

  getCV = function (req, res) {
    var cvName = req.params.cvName;

    const cvPath = path.join(__dirname, '..', '..', 'uploads', 'other', cvName);
    res.sendFile(cvPath);
  }

  updateCV = function (req, res) {

    let cvFile;
    var CV_Upload = req.body.CV_Upload
    var FreelancerID = req.body.FreelancerID;

    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    cvFile = req.files.file;
    console.log("🚀 ~ file: OrderController.js:280 ~ OrderController ~ sampleFile:", cvFile)


    // const uploadPath = '../Prolancer/public/delivery' + deliverFile.name;
    const newFileName = `${FreelancerID}_${cvFile.name}`;
    const commonPath = path.join('uploads', 'other');

    console.log("🚀 ~ file: OrderController.js:26 ~ OrderController ~ uploadPath:", commonPath)
    const uploadPath = path.join(__dirname, '..', '..', commonPath, newFileName);
    const oldPath = path.join(__dirname, '..', '..', commonPath, CV_Upload);
    console.log("🚀 ~ file: OrderController.js:28 ~ OrderController ~ uploadPath:", uploadPath)
    if (fs.existsSync(oldPath)) {
      // Delete the existing file
      console.log("Run Here")
      fsp.unlink(oldPath)
        .then(() => {
          console.log('Existing file deleted successfully');
          continueWithFileUpload();
        })
        .catch((unlinkError) => {
          console.error('Error deleting existing file:', unlinkError);
          return res.status(500).json({ error: 'Error deleting existing file.' });
        });
    } else {
      continueWithFileUpload();

    }

    function continueWithFileUpload() {
      cvFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        const filePath = commonPath.replace(/\\/g, '/');
        console.log("🚀 ~ file: OrderController.js:318 ~ OrderController ~ deliverFile.mv ~ filePath:", filePath);

        CV.updateCV(newFileName, FreelancerID, function (err, result) {
          if (err)
            return res.status(500).send(err);
          else {
            console.log("File uploaded successfully Run Here")
            if (result.affectedRows == 0) {
              return res.send({ message: 'File uploaded Failed' });

            }
            return res.status(200).json(newFileName);
          }
        })
      });
    }

  }
}

module.exports = new CvController;