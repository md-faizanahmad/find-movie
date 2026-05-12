// "use client";

// import { useState } from "react";

// import { LoginModal } from "./LoginModal";
// import { UserMenu } from "./UserMenu";

// interface AuthUser {
//   firstName: string;
// }

// interface AuthSectionProps {
//   user: AuthUser | null;
// }

// export function AuthSection({ user }: AuthSectionProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       {!user ? (
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 active:scale-95"
//         >
//           Login
//         </button>
//       ) : (
//         <UserMenu user={user} />
//       )}

//       <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </>
//   );
// }
