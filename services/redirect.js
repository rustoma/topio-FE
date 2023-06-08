const getMEXRedirects = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/redirects/mex`, {
    referrer: process.env.FRONTEND_HOST,
    referrerPolicy: "origin",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
};

module.exports = {
  getMEXRedirects,
};
