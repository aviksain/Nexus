import { NavBar } from '../components'

function NavbarContainer({children}:any) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  )
}

export default NavbarContainer