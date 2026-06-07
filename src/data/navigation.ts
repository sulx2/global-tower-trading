/** Primary navigation links. Homepage sections use hash anchors. */
export interface NavLinkItem {
  label: string;
  href: string;
}

export const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
