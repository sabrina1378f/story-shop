export const isLoggedIn = () => {
  /**
   *
   *check as if a user admin is logged in and has a token
   *
   * */
  if (localStorage.getItem('token')) return true
  return false
}

export function IsLoggedOut() {
  // let history=useHistory()
  localStorage.clear()

  window.location.reload()
  // history.push('/login')
}
