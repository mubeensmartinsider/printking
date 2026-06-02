import * as Lucide from "lucide-react";

/* Dynamic Lucide icon by name */
export default function Icon({ name, ...props }) {
  const Cmp = Lucide[name] || Lucide.Square;
  return <Cmp {...props} />;
}
