import { transporter } from "@/lib/email/transporter";

interface SendOtpEmailParams {
  email: string;

  otp: string;
}

export async function sendOtpEmail({
  email,
  otp,
}: SendOtpEmailParams): Promise<void> {
  await transporter.sendMail({
    from: `"FindMovie" <${process.env.SMTP_EMAIL}>`,

    to: email,

    subject: "Your FindMovie Login OTP",

    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>FindMovie Verification Code</h2>

        <p>Your OTP code is:</p>

        <div
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            margin: 24px 0;
          "
        >
          ${otp}
        </div>

        <p>This code expires in 10 minutes.</p>

        <p>If you did not request this code, ignore this email.</p>
      </div>
    `,
  });
}
