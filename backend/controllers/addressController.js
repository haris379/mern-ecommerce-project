import Address from "../models/Address.js";

// Save Address
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);

    res.status(201).json({
      success: true,
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving address",
      error: error.message,
    });
  }
};

// Get Addresses
export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};