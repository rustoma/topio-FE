const getMEXRedirects = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/redirects/mex`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
};

module.exports = {
  getMEXRedirects,
};
