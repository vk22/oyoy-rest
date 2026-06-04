const META_PIXEL_ID = "803203529186758";

const hasTrackingConsent = (consent) => consent?.accept_cookies === true;

const loadMetaPixel = (nuxtApp) => {
  if (window.fbq) return;

  window.fbq = function () {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };

  if (!window._fbq) window._fbq = window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");

  nuxtApp.$router.afterEach(() => {
    window.fbq("track", "PageView");
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  const consent = useCookie("user_cookies");
  const { initialize } = useGtag();

  const loadTracking = () => {
    if (!hasTrackingConsent(consent.value)) return;

    initialize();
    loadMetaPixel(nuxtApp);
  };

  loadTracking();

  watch(
    () => consent.value,
    () => loadTracking(),
    { deep: true },
  );
});
