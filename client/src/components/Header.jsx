import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser } = useAuthStore();
  const userInitial = authUser?.fullName?.charAt(0)?.toUpperCase() || "T";

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex will-change-auto items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900"> Workspace</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Welcome
            </p>
            <p className="text-sm font-medium text-slate-800">
              {authUser?.fullName || "Guest"}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm ring-2 ring-white">
            {authUser?.avatar ? (
              <img
                src={authUser.avatar}
                alt={`${authUser.fullName || "User"} avatar`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-700">
                {userInitial}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
