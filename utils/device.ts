const MOBILE_USER_AGENT_RE =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export const isMobileUserAgent = (userAgent = "") => {
  return MOBILE_USER_AGENT_RE.test(userAgent);
};
