# Input Masking & Postcode Lookup

Comprehensive UK form input masking, validation, and automatic address lookup via OpenStreetMap Nominatim.

## Features

### Phone Number Masking

**Format:** `maskUkPhone(raw: string): string`

Formats any UK phone input to consistent format with auto-spacing.

```
Input: "07774079152"      → "07774 079 152"
Input: "+447774079152"    → "+44 7774 079 152"
Input: "07774 079 152"    → "07774 079 152"
Input: "02071838750"      → "02071 838 750"
```

### Postcode Masking

**Format:** `maskPostcode(raw: string): string`

Formats postcodes with proper spacing and uppercase normalization.

```
Input: "CV212AB"    → "CV21 2AB"
Input: "cv21 2ab"   → "CV21 2AB"
Input: "B338TH"     → "B33 8TH"
Input: "W1A1AA"     → "W1A 1AA"
```

### Date Input Formatting

**Format:** `formatDateInput(raw: string): string`

Auto-formats date input, accepts DDMMYYYY or existing formats, returns ISO YYYY-MM-DD.

```
Input: "11112021"   → "2021-11-11"
Input: "11-11-2021" → "2021-11-11"
Input: "1111"       → "11-11"
```

### Time Input Formatting

**Format:** `formatTimeInput(raw: string): string`

Auto-formats time with HH:MM format, prevents invalid values (>23h, >59m).

```
Input: "1430"       → "14:30"
Input: "0930"       → "09:30"
Input: "2530"       → "23:59" (clamped)
Input: "14"         → "14"
```

### Validation

**isValidUkPostcode(postcode: string): boolean**
- Validates UK postcode format (regex-based)
- Accepts: "CV21 2AB", "B338TH", "W1A 1AA", etc.

**isValidUkPhone(phone: string): boolean**
- Validates UK phone format (11 digits 0xxxx or +44xxxxx)

### Normalization

**normalizePhoneNumber(phone: string): string**
- Converts any format to 07774079152 (11 digits, 0 prefix)

**normalizePostcode(postcode: string): string**
- Converts any format to CV212AB (7 chars, uppercase, no spaces)

## Postcode Reverse Lookup

**Feature:** Automatically populate address fields via postcode using OpenStreetMap Nominatim API.

### Usage

```typescript
import { lookupPostcode, createPostcodeLookupDebounced } from "@/lib/postcode-lookup";

// Single lookup
const addr = await lookupPostcode("CV21 2AB");
// Returns: { street: "...", suburb: "...", town: "Rugby", county: "...", latitude: 52.37..., longitude: -1.26... }

// With debouncing (recommended for form fields)
const lookup = createPostcodeLookupDebounced(800);
const addr = await lookup.lookup("CV21 2AB");
```

### Return Data

```typescript
interface AddressData {
  street?: string;        // "123 Main Road"
  suburb?: string;        // "Hillmorton"
  town?: string;          // "Rugby"
  county?: string;        // "Warwickshire"
  postcode?: string;      // "CV21 2AB"
  latitude?: number;      // 52.3704
  longitude?: number;     // -1.2658
}
```

### In EnquiryForm

The form automatically:
1. Detects valid postcode input
2. Initiates Nominatim reverse-lookup (800ms debounce)
3. Auto-populates "area" field with town/suburb
4. Shows loading indicator during lookup

## Phone Formatting for Communication

**Use Cases:** Generate links for tel, SMS, WhatsApp.

```typescript
import { formatPhoneForLink, formatPhoneForSms, formatPhoneForWhatsApp } from "@/lib/phone-formatting";

const phone = "07774 079 152";

formatPhoneForLink(phone)      // "tel:+447774079152"
formatPhoneForSms(phone)       // "sms:+447774079152"
formatPhoneForWhatsApp(phone)  // "https://wa.me/447774079152"
formatPhoneForDisplay(phone)   // "07774 079 152"

isMobileNumber(phone)          // true (07xx)
isLandlineNumber(phone)        // false
```

## Form Integration

### EnquiryForm

```tsx
<input
  type="tel"
  inputMode="tel"
  placeholder="07774 079152"
  onChange={(e) => setValue("phone", maskUkPhone(e.target.value))}
/>

<input
  type="text"
  placeholder="CV21 2AB"
  onChange={(e) => setValue("postcode", maskPostcode(e.target.value))}
  // Auto-triggers postcode lookup, shows loading spinner
/>

<input
  type="date"
  min={new Date().toISOString().split("T")[0]}  // Future dates only
/>

<input
  type="time"
  onChange={(e) => setValue("preferredTime", formatTimeInput(e.target.value))}
/>
```

## API Rate Limits

**Nominatim Rate Limit:** 1 request/second per User-Agent.

Implemented strategies:
- 800ms debounce on postcode input (prevents rapid re-lookup)
- Single concurrent request (cancels pending on new input)
- User-Agent: "JustImagine-Ltd-Heating"

## Error Handling

All utilities gracefully handle:
- Invalid input (returns empty string or null)
- API failures (returns cached/null result)
- Network errors (console warning, form continues)

Example in component:
```tsx
setLookupLoading(true);
postcodeLookup.lookup(postcode).then((addr) => {
  if (addr) {
    // Use address data
    setValue("area", addr.town || "");
  }
  setLookupLoading(false);
});
```

## Testing

Run tests:
```bash
npm run test src/lib/__tests__/input-masks.test.ts
```

Covers:
- Phone masking (domestic, international, partial)
- Postcode masking (spacing, uppercase)
- Date/time formatting
- Validation functions
- Normalization

## Browser Compatibility

All features use:
- ES2020+ (Promise, fetch, .split(), .slice())
- No external dependencies
- Works in all modern browsers + mobile browsers

## Performance

- Masking: <1ms per character (instant visual feedback)
- Postcode lookup: 200-500ms API call + debounce
- No layout shift on masking (same width constraints)

## Future Enhancements

- [ ] Caching API results in localStorage (1-day TTL)
- [ ] Multiple postcode suggestions (ambiguous postcodes)
- [ ] Address autocomplete (as-you-type)
- [ ] Street-level geocoding
- [ ] Integration with Royal Mail PAF database
