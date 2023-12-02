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

    getAllFreelancerWithSkillScore = function (req, res) {
        var pageQuery = req.query;
        var childSkills = pageQuery.childSkills;
        console.log(childSkills);
        var ParentSkillID =childSkills[0].ParentSkillID; 
        var queryBy ='';
        var user = pageQuery.user;
        for ( let cs of childSkills) {
            queryBy += " , MAX(CASE WHEN s.Skill_Name = '"+cs.Skill_Name+ "' THEN f.Score END) AS '" +cs.Skill_Name+"'";
        } 
        console.log(queryBy);
                 
        Skill.getAllFreelancerWithSkillScore(queryBy,ParentSkillID,user,function (err, skills) {
            if (err) { res.send(err); }
            else {
                res.json(skills);

            }
        });
    }

    getSkillWithMajorID = function (req, res) {
        var id = req.params.id;
        Skill.getSkillWithMajorID(id,function (err, skills) {
            if (err) { res.send(err); }
            else {
                res.json(skills);

            }
        });
    }

    updateManySkillScore = function (req, res) {
        var pageQuery = req.body;
        var listUpdate = pageQuery.listUpdate;
        console.log("🚀 ~ file: SkillController.js:46 ~ SkillController ~ listUpdate:", listUpdate)
        var updateQuery ="";
        for ( let lu of listUpdate) {
            updateQuery += " WHEN FreelancerID = "+lu.FreelancerID+ " AND SkillID = "+lu.SkillID+" THEN "+lu.Score;
        } 
        Skill.updateManySkillScore(updateQuery,function (err, result) {
            if (err) { res.send(err); }
            else {
                if (result.affectedRows == 0) {
                res.json("Failed");
                } 
                res.json("Successfully");         
            }
        });
    }

}

module.exports = new SkillController;