export const API_URL =
  "https://calgary-compass-api.onrender.com";

export function getAdminConfig() {

  const password =
    localStorage.getItem(
      "adminPassword"
    );

  return {

    headers: {

      "x-admin-password":
        password || "",

    },

  };

}
