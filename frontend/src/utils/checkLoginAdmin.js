export function isLoggedIn() {
  const admin = localStorage.getItem('admin');
  if (admin) {
    return true;
  } else {
    return false;
  }
}
