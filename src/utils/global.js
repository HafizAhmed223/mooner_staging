export const base_url_staging =process.env.REACT_APP_BASE_URL_FILE;
export const base_url_production =process.env.REACT_APP_BASE_URL_FILE;
export const base_url_file_production =process.env.REACT_APP_BASE_URL_MEDIA;
export const base_url_file_staging =process.env.REACT_APP_BASE_URL_MEDIA;

export const hostname = window.location.hostname;

export const testingServer =
  hostname.includes("localhost") || hostname.includes("staging") ? true : false;

export const base_url_auto = testingServer
  ? base_url_staging
  : base_url_production;

export const base_url_file_auto = testingServer
  ? base_url_file_staging
  : base_url_file_production;
