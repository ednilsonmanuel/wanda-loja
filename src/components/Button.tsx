import React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  /** "pill" torna o botão totalmente arredondado. */
  shape?: "default" | "pill";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", shape = "default", asChild = false, className, disabled, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const classes = [styles.button, styles[variant], styles[size], shape === "pill" ? styles.pill : "", disabled ? styles.disabled : "", className || ""]
      .filter(Boolean)
      .join(" ");
    return (
      <Comp ref={ref} type={type} className={classes} disabled={disabled} {...props}>
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";
