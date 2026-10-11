import "./MenuPopover.css";

export default function MenuPopover({ children, align = "right" }) {
  return (
    <div className={`menuPopover menuPopover--${align}`}>
      {children}
    </div>
  );
}