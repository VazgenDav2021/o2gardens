const getServerBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  return apiUrl.replace(/\/api$/, "");
};

export const getImageUrl = (url: string | undefined | null): string => {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/uploads/") || url.startsWith("/")) {
    const serverBaseUrl = getServerBaseUrl();
    return `${serverBaseUrl}${url}`;
  }

  return url;
};
