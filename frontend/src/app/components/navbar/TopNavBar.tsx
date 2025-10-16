import Logo from "../common/Logo";
import RightActions from "./RightActions";

export default function TopNavBar() {
  return (
    <header className="w-full border-b p-4 flex items-center justify-between">
      <Logo />
      <RightActions />
    </header>
  );
}
