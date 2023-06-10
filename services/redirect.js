const getMEXRedirects = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/redirects/mex`, {
    cache: "no-store",
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
};

module.exports = {
  getMEXRedirects,
};
