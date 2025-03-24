const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required";
  if (!remarks) throw "Remarks is required";

  if (remarks.length < 5) throw "REmarks must be at least 5 characters long.";

  const checkAmountType = validator.isNumeric(amount.toString());
  if (!checkAmountType) throw "Amount must be a number";
  if (amount < 0) throw "Amount must not be negative";

  await transactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    transaction_type: "expense",
    remarks: remarks,
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Expense added successfully",
  });
};

module.exports = addExpense;