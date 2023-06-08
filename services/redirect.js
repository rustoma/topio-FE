const getMEXRedirects = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/redirects/mex`);

  if (!res.ok) {
    return [];
  }

  return res.json();
};

module.exports = {
  getMEXRedirects,
};
