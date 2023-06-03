export const pageView = (GA_TRACKING_ID: string, url: string) => {
  // @ts-ignore
  window.gtag("config", GA_TRACKING_ID, { page_path: url }); // eslint-disable-line
};
