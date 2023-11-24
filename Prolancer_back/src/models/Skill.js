const connectDb = require('../common/connectdb.js');

var Skill = function (skill) {
    this.SkillID = skill.SkillID;
    this.Skill_Name = skill.Skill_Name;
    this.Description = skill.Description;
    this.Status = skill.Status;
    this.PassingScore = skill.PassingScore;
    this.ParentSkillID = skill.ParentSkillID;

};
Skill.getAllMajorSkill = function (result) {

    
    connectDb.query("SELECT * FROM `Skill` WHERE ParentSkillID IS NULL", function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Skill.getAllFreelancerWithSkillScore  = function (queryBy,ParentSkillID,result) {

    var sql = "SELECT f.FreelancerID, fr.First_Name, fr.Last_Name, fr.Profile_Picture " +
    queryBy +
    " FROM FreelancerSkill f " +
    "INNER JOIN Skill s ON f.SkillID = s.SkillID " +
    "INNER JOIN Freelancer fr ON f.FreelancerID = fr.FreelancerID " +
    "WHERE s.ParentSkillID = "+ParentSkillID +
    " GROUP BY f.FreelancerID";

    
    connectDb.query(sql, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Skill.getSkillWithMajorID  = function (id,result) {

    var sql = "SELECT * FROM `Skill` WHERE ParentSkillID = ?";

    
    connectDb.query(sql, [id], function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Skill.updateManySkillScore  = function (updateQuery,result) {

    var sql = "UPDATE FreelancerSkill " +
    "SET Score = CASE" +
    updateQuery+
    " ELSE Score END";

    console.log("🚀 ~ file: Skill.js:64 ~ sql:", sql)
    
    connectDb.query(sql, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Skill;