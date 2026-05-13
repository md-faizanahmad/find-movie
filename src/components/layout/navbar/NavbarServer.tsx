import { getCurrentUser } from "@/features/Auth/lib/auth";
import { Navbar } from "./Navbar";

import { NavbarUser } from "./navbar.types";

export async function NavbarServer() {
  const user = await getCurrentUser();

  let navbarUser: NavbarUser | null = null;

  if (user) {
    navbarUser = {
      firstName: user.fullName.split(" ")[0] ?? "User",
    };
  }

  return <Navbar user={navbarUser} />;
}
