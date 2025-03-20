const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password"); //name balance , all except password
  console.log(req.user);
  res.status(200).json({
    status: "Successfull",
    data: getUser,
  });
};

module.exports = userDashboard;