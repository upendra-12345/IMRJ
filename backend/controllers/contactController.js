import Contact from "../models/Contact.js";

// Submit contact message
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Save message
    const contact = await Contact.create({
      name,
      phone,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully.",
      contact,
    });

  } catch (error) {
    console.error("Contact submission error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to submit your message. Please try again.",
    });
  }
};