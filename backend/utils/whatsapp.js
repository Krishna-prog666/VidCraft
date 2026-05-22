const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
const contentSid = process.env.TWILIO_CONTENT_SID;

let client;

if (accountSid && authToken && authToken !== 'your_auth_token_here') {
  client = twilio(accountSid, authToken);
}

/**
 * Sends a WhatsApp message to the admin.
 * @param {string} message - The message content (used if no template).
 * @param {Object} [variables] - Template variables for Twilio Content API.
 * @returns {Promise<void>}
 */
const sendAdminNotification = async (message, variables = null) => {
  if (!client) {
    console.warn('Twilio client not initialized or placeholder token used. Check your environment variables.');
    return;
  }

  try {
    const messageOptions = {
      from: twilioNumber,
      to: adminNumber
    };

    if (contentSid && variables) {
      messageOptions.contentSid = contentSid;
      messageOptions.contentVariables = JSON.stringify(variables);
    } else {
      messageOptions.body = message;
    }

    await client.messages.create(messageOptions);
    console.log('WhatsApp notification sent to admin.');
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
  }
};

/**
 * Sends a WhatsApp message to a specific client.
 * @param {string} to - The client's phone number.
 * @param {string} message - The message content (used if no template).
 * @param {Object} [variables] - Template variables for Twilio Content API.
 * @returns {Promise<void>}
 */
const sendClientNotification = async (to, message, variables = null) => {
  if (!client) {
    console.warn('Twilio client not initialized or placeholder token used. Check your environment variables.');
    return;
  }

  try {
    // Ensure the number has the 'whatsapp:' prefix
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    const messageOptions = {
      from: twilioNumber,
      to: formattedTo
    };

    if (contentSid && variables) {
      messageOptions.contentSid = contentSid;
      messageOptions.contentVariables = JSON.stringify(variables);
    } else {
      messageOptions.body = message;
    }

    await client.messages.create(messageOptions);
    console.log(`WhatsApp notification sent to client at ${formattedTo}.`);
  } catch (error) {
    console.error('Error sending WhatsApp notification to client:', error);
  }
};

module.exports = { sendAdminNotification, sendClientNotification };
