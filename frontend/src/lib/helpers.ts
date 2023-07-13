export function getToken() {
  const token = localStorage.getItem("auth_token");
  if (!token || token.length === 0) {
    return;
  }
  return token;
}
