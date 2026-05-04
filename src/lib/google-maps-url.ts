/**
 * Google Maps URL to get directions to a destination (user's start is their current
 * location when the Maps app allows it).
 * @see https://developers.google.com/maps/documentation/urls/get-started
 */
export function googleMapsDirectionsUrl(destination: string): string {
  const q = destination.trim();
  if (!q) {
    return "https://www.google.com/maps/";
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
}
