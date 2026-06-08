const hasTrackingConsent = (consent) => consent?.accept_cookies === true;

const loadGtm = (gtmId) => {
  if (!gtmId || document.querySelector(`script[data-gtm-id="${gtmId}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gtmId = gtmId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
};

export default defineNuxtPlugin(() => {
  const consent = useCookie("user_cookies");
  const { gtmId } = useRuntimeConfig().public;

  const loadTracking = () => {
    if (!hasTrackingConsent(consent.value)) return;

    loadGtm(gtmId);
  };

  loadTracking();

  watch(
    () => consent.value,
    () => loadTracking(),
    { deep: true },
  );
});
