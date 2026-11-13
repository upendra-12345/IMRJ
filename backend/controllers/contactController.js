import mongoose from "mongoose";
import Contact from "../models/Contact.js";

// PUBLIC: Submit contact message
export const createContact = async (req, res) => {
try {
const { name, phone, email, subject, message } = req.body;

if (
  !name?.trim() ||
  !email?.trim() ||
  !subject?.trim() ||
  !message?.trim()
) {
  return res.status(400).json({
    success: false,
    message: "Please fill all required fields.",
  });
}
const contact = await Contact.create({
  name: name.trim(),
  phone: phone?.trim() || "",
  email: email.trim().toLowerCase(),
  subject: subject.trim(),
  message: message.trim(),
});
return res.status(201).json({
  success: true,
  message: "Your message has been submitted successfully.",
  contact,
});

} catch (error) {
console.error("Contact submission error:", error);

return res.status(500).json({
  success: false,
  message: "Unable to submit your message. Please try again.",
});

}
};

// ADMIN: Get all contact messages
export const getAllContacts = async (req, res) => {
try {
const contacts = await Contact.find()
.sort({ createdAt: -1 })
.lean();

return res.status(200).json({
  success: true,
  count: contacts.length,
  contacts,
});

} catch (error) {
console.error("Get contacts error:", error);

return res.status(500).json({
  success: false,
  message: "Unable to fetch contact messages.",
});

}
};

// ADMIN: Get one contact message
export const getContactById = async (req, res) => {
try {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    success: false,
    message: "Invalid contact ID.",
  });
}
const contact = await Contact.findById(id);
if (!contact) {
  return res.status(404).json({
    success: false,
    message: "Contact message not found.",
  });
}
return res.status(200).json({
  success: true,
  contact,
});

} catch (error) {
console.error("Get contact error:", error);

return res.status(500).json({
  success: false,
  message: "Unable to fetch contact message.",
});

}
};

// ADMIN: Update message status
export const updateContactStatus = async (req, res) => {
try {
const { id } = req.params;
const { status } = req.body;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    success: false,
    message: "Invalid contact ID.",
  });
}
const allowedStatuses = ["Unread", "Read", "Replied"];
if (!allowedStatuses.includes(status)) {
  return res.status(400).json({
    success: false,
    message: "Invalid status. Use Unread, Read or Replied.",
  });
}
const contact = await Contact.findByIdAndUpdate(
  id,
  { $set: { status } },
  {
    new: true,
    runValidators: true,
  }
);
if (!contact) {
  return res.status(404).json({
    success: false,
    message: "Contact message not found.",
  });
}
return res.status(200).json({
  success: true,
  message: "Message status updated successfully.",
  contact,
});

} catch (error) {
console.error("Update contact status error:", error);

return res.status(500).json({
  success: false,
  message: "Unable to update message status.",
});

}
};

// ADMIN: Delete contact message
export const deleteContact = async (req, res) => {
try {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    success: false,
    message: "Invalid contact ID.",
  });
}
const contact = await Contact.findByIdAndDelete(id);
if (!contact) {
  return res.status(404).json({
    success: false,
    message: "Contact message not found.",
  });
}
return res.status(200).json({
  success: true,
  message: "Contact message deleted successfully.",
});

} catch (error) {
console.error("Delete contact error:", error);

return res.status(500).json({
  success: false,
  message: "Unable to delete contact message.",
});

}
};