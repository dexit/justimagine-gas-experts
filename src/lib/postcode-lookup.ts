/**
 * Postcode Reverse Lookup via OpenStreetMap Nominatim
 * Converts postcode → address components (street, area, town)
 */

export interface AddressData {
  street?: string;
  suburb?: string;
  town?: string;
  county?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Fetch address components from UK postcode via Nominatim
 * Uses reverse geocoding: postcode → coordinates → address
 */
export async function lookupPostcode(postcode: string): Promise<AddressData | null> {
  try {
    // Validate postcode format first
    const cleaned = postcode.toUpperCase().replace(/\s/g, "");
    if (!/^[A-Z0-9]{6,7}$/i.test(cleaned)) {
      console.warn("[postcode-lookup] Invalid postcode format:", postcode);
      return null;
    }

    // Step 1: Get coordinates from postcode using geocoding
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${encodeURIComponent(cleaned)}&country=GB&limit=1`;
    const geoResponse = await fetch(geocodeUrl, {
      headers: { "User-Agent": "JustImagine-Ltd-Heating" },
    });

    if (!geoResponse.ok) {
      console.warn("[postcode-lookup] Geocode failed:", geoResponse.statusText);
      return null;
    }

    const geoData = (await geoResponse.json()) as Array<{
      lat: string;
      lon: string;
      boundingbox?: [string, string, string, string];
    }>;

    if (!geoData.length) {
      console.warn("[postcode-lookup] No results for postcode:", postcode);
      return null;
    }

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    // Step 2: Reverse geocode to get address components
    const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    const reverseResponse = await fetch(reverseUrl, {
      headers: { "User-Agent": "JustImagine-Ltd-Heating" },
    });

    if (!reverseResponse.ok) {
      console.warn("[postcode-lookup] Reverse geocode failed:", reverseResponse.statusText);
      return { latitude: lat, longitude: lon }; // Return coords even if address fails
    }

    const reverseData = (await reverseResponse.json()) as {
      address: {
        road?: string;
        house_number?: string;
        suburb?: string;
        village?: string;
        town?: string;
        city?: string;
        county?: string;
        postcode?: string;
      };
    };

    const addr = reverseData.address || {};
    const street = addr.road
      ? addr.house_number
        ? `${addr.house_number} ${addr.road}`
        : addr.road
      : undefined;

    return {
      street,
      suburb: addr.suburb || addr.village,
      town: addr.town || addr.city,
      county: addr.county,
      postcode: addr.postcode || cleaned,
      latitude: lat,
      longitude: lon,
    };
  } catch (err) {
    console.warn("[postcode-lookup] Error:", err instanceof Error ? err.message : String(err));
    return null;
  }
}

/**
 * Debounce postcode lookup to avoid excessive API calls
 * Returns previous result if called within debounce window
 */
export function createPostcodeLookupDebounced(delayMs = 500) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastResult: AddressData | null = null;
  let lastPostcode = "";

  return {
    async lookup(postcode: string): Promise<AddressData | null> {
      return new Promise((resolve) => {
        if (timeoutId) clearTimeout(timeoutId);

        // Return cached result if same postcode
        if (postcode === lastPostcode && lastResult) {
          resolve(lastResult);
          return;
        }

        timeoutId = setTimeout(async () => {
          const result = await lookupPostcode(postcode);
          lastResult = result;
          lastPostcode = postcode;
          resolve(result);
        }, delayMs);
      });
    },
    cancel() {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = null;
    },
  };
}
