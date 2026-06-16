/**
 * Phone number formatting utilities for display and communication
 */

/**
 * Format phone for tel: link (dial-able)
 * Input: "07774 079152" → Output: "tel:+447774079152"
 */
export function formatPhoneForLink(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) {
    return `tel:+44${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

/**
 * Format phone for SMS: link
 * Input: "07774 079152" → Output: "sms:+447774079152"
 */
export function formatPhoneForSms(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) {
    return `sms:+44${digits.slice(1)}`;
  }
  return `sms:${digits}`;
}

/**
 * Format phone for WhatsApp link
 * Input: "07774 079152" → Output: "https://wa.me/447774079152"
 */
export function formatPhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  const number = digits.startsWith("0") ? digits.slice(1) : digits;
  return `https://wa.me/44${number}`;
}

/**
 * Format phone for display (human-readable)
 * Input: "07774079152" → Output: "07774 079152"
 */
export function formatPhoneForDisplay(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+44")) {
    const rest = digits.slice(3);
    if (rest.length <= 4) return `+44 ${rest}`;
    if (rest.length <= 7) return `+44 ${rest.slice(0, 4)} ${rest.slice(4)}`;
    return `+44 ${rest.slice(0, 4)} ${rest.slice(4, 7)} ${rest.slice(7)}`;
  }
  if (digits.length <= 5) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}

/**
 * Check if phone is a mobile number (starts with 07)
 */
export function isMobileNumber(phone: string): boolean {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("07") || (digits.startsWith("+447"));
}

/**
 * Check if phone is a landline number (other UK area codes)
 */
export function isLandlineNumber(phone: string): boolean {
  const digits = phone.replace(/[^\d+]/g, "");
  return !digits.startsWith("07") && !digits.startsWith("+447");
}
