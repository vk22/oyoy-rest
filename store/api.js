export const fetchApiData = async (url, options = {}, fallback = null) => {
  try {
    const { data, error } = await useFetch(url, options);

    if (error.value) {
      console.error(`API request failed: ${url}`, error.value);
      return fallback;
    }

    return data.value?.data ?? fallback;
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    return fallback;
  }
};

export const fetchApiItems = async (url, options = {}, fallback = []) => {
  try {
    const { data, error } = await useFetch(url, options);

    if (error.value) {
      console.error(`API request failed: ${url}`, error.value);
      return fallback;
    }

    return data.value?.items ?? data.value?.data ?? fallback;
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    return fallback;
  }
};
