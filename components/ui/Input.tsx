"use client";

import React from "react";
import { colors } from "@/assets/theme/colors";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input(props: InputProps) {
  const { label, error, className = "", id, ...rest } = props;
  const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={
          "w-full px-3 py-2 rounded-lg border " +
          colors.input +
          (error ? " border-rose-500 dark:border-rose-400" : "") +
          " " +
          className
        }
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>
      ) : null}
    </div>
  );
}
