const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/verify-payment", async (req, res) => {
  const { amt, pid } = req.body;

  const verificationURL = `https://rc-epay.esewa.com.np/api/epay/transrec`;
  const formData = new URLSearchParams();
  formData.append("amt", amt);
  formData.append("scd", "EPAYTEST");
  formData.append("pid", pid);
  formData.append("rid", req.body.rid); // Transaction Reference ID

  try {
    const response = await fetch(verificationURL, {
      method: "POST",
      body: formData,
    });
    const data = await response.text();

    if (data.includes("Success")) {
      res.json({ success: true, message: "Payment verified!" });
    } else {
      res.json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
});

module.exports = router;
