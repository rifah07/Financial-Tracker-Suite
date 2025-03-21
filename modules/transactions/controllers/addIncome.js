const mongoose = require("mongoose");

const addIncome = (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required";
  if (!remarks) throw "Remarks is required";

  if (remarks.length < 5) throw "REmarks must be at least 5 characters long.";

  res.status(200).json({
    status: "Success",
    message: "Income added successfully"
  });
};

module.exports = addIncome;