import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Dribble</title>
<style>
  /* Inline CSS for better email client compatibility */
  body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #333;
    text-align: center;
    margin-top: 0;
  }
  p {
    color: #555;
    text-align: center;
    margin-bottom: 20px;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
  }
  .button:hover {
    background-color: #0056b3;
  }
</style>
</head>
<body>
<div class="container">
  <h1>Welcome to Dribble!</h1>
  <p>Thank you for registering with Dribble. We're excited to have you onboard.</p>
  <p>Enjoy our service and have a great day!</p>
</div>
</body>
</html>
`;

const sendEmail = async (toSend) => {
  try {
    const { data } = await resend.emails.send({
      from: "Dribbble <onboarding@resend.dev>",
      to: [toSend],
      subject: "hello world",
      // html: "<strong>it works!</strong>",
      html: html,
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export default sendEmail;
