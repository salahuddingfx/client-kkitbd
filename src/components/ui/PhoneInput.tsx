"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { countries, type Country } from "@/data/countries";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: string;
  className?: string;
  placeholder?: string;
}

// Max local number length per country (digits only, without dial code)
const MAX_LENGTHS: Record<string, number> = {
  BD: 11, // 01712345678
  IN: 10,
  US: 10,
  UK: 10,
  PK: 10,
  NP: 10,
  LK: 9,
  DEFAULT: 12,
};

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "BD",
  className,
  placeholder = "Enter phone number",
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Country>(
    () => countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!search) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const handleSelect = (country: Country) => {
    setSelected(country);
    setOpen(false);
    setSearch("");
    // Re-emit current local number with new country code
    const localNumber = stripCountryCode(value, country);
    if (localNumber) {
      onChange(formatFullNumber(localNumber, country));
    }
  };

  const maxLen = MAX_LENGTHS[selected.code] || MAX_LENGTHS.DEFAULT;

  // Strip existing dial code from value to get local number for display
  const displayNumber = stripDialCode(value, countries);

  const handleChange = (input: string) => {
    // Only allow digits
    const digits = input.replace(/\D/g, "");
    // Enforce max length
    const truncated = digits.slice(0, maxLen);
    onChange(formatFullNumber(truncated, selected));
  };

  return (
    <div className={cn("relative flex", className)}>
      {/* Country Selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 h-12 px-3 rounded-l-lg border border-r-0 border-input bg-background text-sm hover:bg-muted transition-colors"
        >
          <span className="text-lg leading-none">{selected.flag}</span>
          <span className="text-muted-foreground text-xs font-medium">{selected.dial}</span>
          <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 w-72 max-h-72 rounded-xl border border-border bg-background shadow-xl z-50 overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full h-9 pl-8 pr-3 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto max-h-56 p-1">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No countries found</p>
              ) : (
                filtered.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors",
                      selected.code === country.code && "bg-primary/10 text-primary"
                    )}
                  >
                    <span className="text-lg leading-none">{country.flag}</span>
                    <span className="flex-1 text-left truncate">{country.name}</span>
                    <span className="text-muted-foreground text-xs">{country.dial}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={displayNumber}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLen}
        className="flex-1 h-12 rounded-r-lg border border-l-0 border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-colors"
      />
    </div>
  );
}

// Format: "+8801712345678"
function formatFullNumber(localDigits: string, country: Country): string {
  if (!localDigits) return "";
  return `${country.dial}${localDigits}`;
}

// Strip any known dial code from the full number to get local digits
function stripDialCode(fullNumber: string, allCountries: Country[]): string {
  if (!fullNumber) return "";
  // Sort by dial length descending to match longest first
  const sorted = [...allCountries].sort((a, b) => b.dial.length - a.dial.length);
  for (const c of sorted) {
    if (fullNumber.startsWith(c.dial)) {
      return fullNumber.slice(c.dial.length);
    }
  }
  // Fallback: strip leading +
  return fullNumber.replace(/^\+/, "");
}

// For when country changes: try to keep the local number
function stripCountryCode(value: string, newCountry: Country): string {
  return stripDialCode(value, countries);
}
