export function otpEmailTemplate(otp) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:40px auto;border-radius:10px;overflow:hidden;box-shadow:0 0 15px rgba(0,0,0,0.08);">

<tr>
<td style="background:#2563eb;padding:25px;text-align:center;">
<h1 style="color:white;margin:0;">Email Verification</h1>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#222;">
Hello 👋
</h2>

<p style="font-size:16px;color:#555;line-height:1.7;">
Thank you for registering.
Use the following One-Time Password (OTP) to verify your email address.
</p>

<div style="margin:35px 0;text-align:center;">
<span style="
display:inline-block;
padding:18px 40px;
font-size:32px;
font-weight:bold;
letter-spacing:8px;
background:#f1f5f9;
border-radius:8px;
color:#2563eb;
">
${otp}
</span>
</div>

<p style="font-size:15px;color:#555;">
This OTP is valid for
<strong>5 minutes</strong>.
</p>

<p style="font-size:15px;color:#555;">
Please do not share this OTP with anyone.
</p>

<hr style="margin:35px 0;border:none;border-top:1px solid #e5e7eb;">

<p style="font-size:13px;color:#888;">
If you didn't request this email, you can safely ignore it.
</p>

</td>
</tr>

<tr>
<td style="background:#f8fafc;padding:20px;text-align:center;font-size:13px;color:#666;">
© 2026 Your Application. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}
