const Skill = require('../models/Skill');
class SkillController {
    getAllMajorSkill = function (req, res) {
        Skill.getAllMajorSkill(function (err, skills) {
            if (err) { res.send(err); }
            else {
                res.json(skills);

            }
        });
    }

    getFreelancerWithSkillScore = function (req, res) {
        var pageQuery = req.query;
        var childSkills = pageQuery.childSkills;
        console.log(childSkills);
        var ParentSkillID =childSkills[0].ParentSkillID; 
        var queryBy ='';
        var user = pageQuery.user;
        if (!childSkills||!user) {
            return res.status(400).send('Invalid or missing order data');
          }
        for ( let cs of childSkills) {
            queryBy += " , MAX(CASE WHEN s.Skill_Name = '"+cs.Skill_Name+ "' THEN f.Score END) AS '" +cs.Skill_Name+"'";
        } 
        console.log(queryBy);
                 
        Skill.getFreelancerWithSkillScore(queryBy,ParentSkillID,user,function (err, skills) {
            if (err) { res.send(err); }
            else {
                res.json(skills);

            }
        });
    }

    getSkillWithMajorID = function (req, res) {
        var id = req.params.id;
        if (!id) {
            return res.status(400).send('Invalid or missing order data');
          }
        Skill.getSkillWithMajorID(id,function (err, skills) {
            if (err) { res.status(500).send(err); }
            else {
                res.send(skills.length > 0 ? skills : 'Skill not exist');
            }
        });
    }

    updateManySkillScore = function (req, res) {
        var pageQuery = req.body;
        var listUpdate = pageQuery.listUpdate;
        console.log("🚀 ~ file: SkillController.js:46 ~ SkillController ~ listUpdate:", listUpdate)
        var updateQuery ="";
        if (!listUpdate) {
            return res.status(400).send('Invalid or missing order data');
          }
        for ( let lu of listUpdate) {
            updateQuery += " WHEN FreelancerID = "+lu.FreelancerID+ " AND SkillID = "+lu.SkillID+" THEN "+lu.Score;
        } 
        Skill.updateManySkillScore(updateQuery,function (err, result) {
            if (err) { res.send(err); }
            else {
                if (result.affectedRows == 0) {
                res.json("Save Freelancer Score Failed");
                } 
                res.json("Save Freelancer Score Successfully");         
            }
        });
    }

    getSkillScoreByFreelancerID = function (req, res) {
        var id = req.params.id;
    
        if (!id) {
          return res.status(400).send('Invalid or missing data');
        }
        Skill.getSkillScoreByFreelancerID(id, function (err, skillScore) {
          if (err)
            res.status(500).send(err);
          else {
            res.send(skillScore.length > 0 ? skillScore : 'Freelancer not exist');
    
          }
        });
    
      };

}

module.exports = new SkillController;