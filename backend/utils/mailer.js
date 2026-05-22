const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Standardizing on Gmail as it's the easiest to test
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBookingEmails(booking) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Mailer configured without EMAIL_USER or EMAIL_PASS in .env. Skipping emails.");
    return;
  }

  const clientMail = {
    from: `"Video Platform" <${process.env.EMAIL_USER}>`,
    to: booking.user?.email,
    subject: `Booking Confirmed: ${booking.projectName} - Video Platform`,
    text: `Awesome news! 🎉\n\nWe have successfully received your booking for "${booking.projectName}". Our team is currently reviewing the details and will get back to you shortly.\n\nThank you for choosing us and trusting our team with your project. 🎥✨\n\nBest Regards,\nVideo Platform Team`,
  };

  const adminMail = {
    from: `"Video Platform" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'New Booking Received',
    text: `Admin,\n\nA new booking has been made.\n\nClient Name: ${booking.user?.name}\nClient Email: ${booking.user?.email}\nProject: ${booking.projectName}\nService: ${booking.service?.title}\nBudget: ₹${booking.budget}\nDeadline: ${new Date(booking.deadline).toLocaleDateString()}\n\nPlease login to the dashboard to view more details.`,
  };

  try {
    await Promise.all([
      transporter.sendMail(clientMail),
      transporter.sendMail(adminMail),
    ]);
    console.log(`Booking emails sent successfully for booking ID: ${booking._id}`);
  } catch (err) {
    console.error("Error sending booking emails:", err.message);
  }
}

async function sendStatusUpdateEmail(booking) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Mailer configured without EMAIL_USER or EMAIL_PASS in .env. Skipping emails.");
    return;
  }

  let subject = '';
  let message = '';
  const adminNotesText = booking.adminNotes ? `Admin Notes: ${booking.adminNotes}\n\n` : '';

  if (booking.status === 'In Progress') {
    subject = `We're working on your project: ${booking.projectName} 🚀`;
    message = `Great news! 🚀\n\nOur creative editing team has started working on your project "${booking.projectName}" to deliver a polished and high-quality final video.\n\nWe’re excited to bring your vision to life and will keep you informed on the progress along the way.\n\n${adminNotesText}Thank you for choosing us and trusting our team with your project. 🎥✨\n\nBest Regards,\nVideo Platform Team`;
  } else if (booking.status === 'Completed') {
    subject = `Your project is ready! 🎉: ${booking.projectName}`;
    message = `Amazing news! 🎉\n\nYour video project "${booking.projectName}" is completely finished and ready for you!\n\nOur team had a great time working on this, and we hope you love the final result.\n\n${adminNotesText}Thank you for choosing us and trusting our team with your project. 🎥✨\n\nBest Regards,\nVideo Platform Team`;
  } else if (booking.status === 'Cancelled') {
    subject = `Booking Cancelled: ${booking.projectName}`;
    message = `Hello ${booking.user?.name},\n\nWe are writing to let you know that your booking for "${booking.projectName}" has been cancelled.\n\n${adminNotesText}If you have any questions or would like to discuss this further, please feel free to reach out to us.\n\nBest Regards,\nVideo Platform Team`;
  } else {
    // Fallback for any other status (like 'Pending')
    subject = `Booking Status: ${booking.status} - ${booking.projectName}`;
    message = `Hi ${booking.user?.name},\n\nThe status of your booking for "${booking.projectName}" is now: ${booking.status}.\n\n${adminNotesText}Thank you for choosing us!\n\nBest Regards,\nVideo Platform Team`;
  }

  const clientMail = {
    from: `"Video Platform" <${process.env.EMAIL_USER}>`,
    to: booking.user?.email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(clientMail);
    console.log(`Status email sent successfully for booking ID: ${booking._id}`);
  } catch (err) {
    console.error("Error sending status email:", err.message);
  }
}

module.exports = { sendBookingEmails, sendStatusUpdateEmail };
