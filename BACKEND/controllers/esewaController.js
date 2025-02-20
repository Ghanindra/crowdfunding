const payment = require("../models/payment.js");

const EsewaInitiatePayment = async (req, res) => {
  try {
    const { EsewaPaymentGateway } = await import("esewajs"); // Dynamic Import
    const {campaignId, amount, productId } = req.body;

    // Validate inputs
    if (!campaignId || !amount || !productId) {
      return res.status(400).json({ error: "Missing required fields (campaignId, amount, productId)" });
    }
    if (!campaignId) {
      return res.status(400).json({ error: "Campaign ID is required" });
    }

    const reqPayment = await EsewaPaymentGateway(
      amount, 0, 0, 0,
      productId,
      process.env.MERCHANT_ID,
      process.env.SECRET,
      process.env.SUCCESS_URL,
      process.env.FAILURE_URL,
      process.env.ESEWAPAYMENT_URL
    );

    if (!reqPayment || reqPayment.status !== 200) {
      return res.status(400).json({ error: "Error sending payment data" });
    }

    // Save transaction to database
    const transaction = new payment({
      campaignId: campaignId,
      product_id: productId,
      amount: amount,
      status: "Pending",
    });

    await transaction.save();
    console.log("Transaction initiated successfully");

    if (!reqPayment.request?.res?.responseUrl) {
      return res.status(400).json({ error: "Invalid payment gateway response" });
    }

    return res.json({ url: reqPayment.request.res.responseUrl });

  } catch (error) {
    console.error("Esewa payment initiation error:", error);
    return res.status(500).json({ error: error.message });
  }


   
};

const paymentStatus = async (req, res) => {
  try {
    const { EsewaCheckStatus } = await import("esewajs"); // Dynamic Import
    const { product_id} = req.body;

    const transaction = await payment.findOne({ product_id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const paymentStatusCheck = await EsewaCheckStatus(
      transaction.amount,
      transaction.product_id,
   
      process.env.MERCHANT_ID,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL
    );

    if (!paymentStatusCheck || paymentStatusCheck.status !== 200) {
      return res.status(400).json({ message: "Failed to fetch transaction status" });
    }
   // Log the payment status from Esewa
   console.log("Payment status from gateway:", paymentStatusCheck.data.status);

    
  // Update the transaction status
  if (paymentStatusCheck.data.status === "COMPLETE") {
    transaction.status = "Success";
  } else if (paymentStatusCheck.data.status === "Failed") {
    transaction.status = "FAILED";
  } else {
    transaction.status = "Pending"; // Default case for unknown status
  }

  // Save the updated status in the database
  await transaction.save();

    res.status(200).json({ message: "Transaction status updated successfully", status: transaction.status });

  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { EsewaInitiatePayment, paymentStatus };

