async function geocodePlace(query) {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "homify/1.0" },
  });

  if (!res.ok) {
    throw new Error(`Geocoding request failed (${res.status})`);
  }

  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature) return null;

  const [longitude, latitude] = feature.geometry.coordinates;
  return { longitude, latitude };
}

module.exports = geocodePlace;
