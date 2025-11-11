import Payment from "../models/PaymentSchedule.js";

export const getPayments = async (req, res) => {
  try {
    const data = await Payment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

export const addPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.json({ message: "Payment schedule added successfully", payment });
  } catch (err) {
    res.status(500).json({ message: "Error adding payment" });
  }
};

export const deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment schedule deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting payment" });
  }
};
