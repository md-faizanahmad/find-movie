import crypto from "crypto";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 10;

export function generateOtp(): string {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;

  return crypto.randomInt(min, max).toString();
}

export function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export function verifyOtpHash(otp: string, hashedOtp: string): boolean {
  const incomingHash = hashOtp(otp);

  return crypto.timingSafeEqual(
    Buffer.from(incomingHash),
    Buffer.from(hashedOtp),
  );
}

export function getOtpExpiryDate(): Date {
  const expiry = new Date();

  expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_MINUTES);

  return expiry;
}
