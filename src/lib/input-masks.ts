/**
 * UK Input Masking Utilities
 * Handles phone, postcode, date, and time formatting
 */

/**
 * Mask UK phone numbers to proper format
 * Accepts: 07774079152, +447774079152, 0 7774 079152
 * Returns: 07774 079152 or +44 7774 079152
 */
export function maskUkPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  
  // International format
  if (digits.startsWith("+44")) {
    const rest = digits.slice(3).replace(/\D/g, "").slice(0, 10);
    if (rest.length === 0) return "+44 ";
    if (rest.length <= 4) return `+44 ${rest}`;
    if (rest.length <= 7) return `+44 ${rest.slice(0, 4)} ${rest.slice(4)}`;
    return `+44 ${rest.slice(0, 4)} ${rest.slice(4, 7)} ${rest.slice(7)}`;
  }
  
  // UK domestic format (0XXXX XXXXXX)
  const d = digits.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 5) return d;
  if (d.length <= 8) return `${d.slice(0, 5)} ${d.slice(5)}`;
  return `${d.slice(0, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
}

/**
 * Mask UK postcodes to proper format
 * Accepts: CV212AB, CV21 2AB, cv212ab
 * Returns: CV21 2AB (proper spacing)
 */
export function maskPostcode(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  if (cleaned.length === 0) return "";
  if (cleaned.length <= 4) return cleaned;
  // Standard UK format: XXXX XXX (outward code + inward code)
  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
}

/**
 * Format date input as YYYY-MM-DD with auto-advance
 * Accepts: 11112021, 11/11/2021, 2021-11-11
 * Returns: 2021-11-11 (ISO format for HTML date input)
 */
export function formatDateInput(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  
  if (digits.length === 0) return "";
  
  // Handle DDMMYYYY format with auto-advance
  if (digits.length <= 8) {
    let formatted = "";
    for (let i = 0; i < Math.min(digits.length, 8); i++) {
      formatted += digits[i];
      if (i === 1 || i === 3) formatted += "-";
    }
    return formatted;
  }
  
  // Reverse to YYYY-MM-DD if entered as DD-MM-YYYY
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  
  if (year && month && day) {
    const date = new Date(`${year}-${month}-${day}`);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
  }
  
  return "";
}

/**
 * Format time input as HH:MM with auto-advance
 * Accepts: 1430, 14:30, 14.30
 * Returns: 14:30
 */
export function formatTimeInput(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  
  if (digits.length === 0) return "";
  if (digits.length === 1) return digits;
  if (digits.length === 2) {
    const hour = parseInt(digits);
    if (hour > 23) return "23";
    return digits;
  }
  if (digits.length === 3) return `${digits.slice(0, 2)}:${digits[2]}`;
  if (digits.length >= 4) {
    const hour = digits.slice(0, 2);
    const min = digits.slice(2, 4);
    const h = parseInt(hour);
    const m = parseInt(min);
    if (h > 23) return "23:59";
    if (m > 59) return `${hour}:59`;
    return `${hour}:${min}`;
  }
  
  return "";
}

/**
 * Validate UK postcode format
 * Matches: CV21 2AB, B33 8TH, W1A 1AA, etc.
 */
export function isValidUkPostcode(postcode: string): boolean {
  const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode.trim());
}

/**
 * Validate UK phone number format
 */
export function isValidUkPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, "");
  // +44 format: +441234567890 (13 chars)
  // 0 format: 01234567890 or 07774079152 (11 chars)
  return (cleaned.startsWith("+44") && cleaned.length === 13) || 
         (cleaned.startsWith("0") && (cleaned.length === 10 || cleaned.length === 11));
}

/**
 * Normalize phone number for storage
 * Convert all formats to: 07774079152 (11 digits, no formatting)
 */
export function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, "");
  
  // Convert +44 to 0
  if (cleaned.startsWith("+44")) {
    cleaned = "0" + cleaned.slice(3);
  }
  
  return cleaned.slice(0, 11);
}

/**
 * Normalize postcode for storage
 * Convert to: CV212AB (no spaces, uppercase)
 */
export function normalizePostcode(postcode: string): string {
  return postcode.toUpperCase().replace(/\s/g, "").slice(0, 7);
}
