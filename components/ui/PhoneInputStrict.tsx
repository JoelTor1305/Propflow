'use client';

import React, { useState, useEffect } from 'react';
import {
    getCountries,
    getCountryCallingCode,
    Country
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
    error?: string;
    className?: string;
    placeholder?: string;
}

export function PhoneInput({
    value,
    onChange,
    label = "Phone Number",
    error,
    className = "",
    placeholder = "Enter phone number"
}: PhoneInputProps) {
    // Default to US
    const [country, setCountry] = useState<Country>('US');
    const [displayValue, setDisplayValue] = useState('');

    // Sync external value to internal display state
    useEffect(() => {
        if (!value) {
            setDisplayValue('');
            return;
        }

        // Value comes in as +1xxxxxxxxxx (E.164-ish)
        // We want to strip the calling code +1 for the input field if it matches current country
        const code = getCountryCallingCode(country);
        const prefix = `+${code}`;

        if (value.startsWith(prefix)) {
            const national = value.slice(prefix.length);
            // Re-format just the national part
            const { formatted } = formatPhoneNumber(national);
            setDisplayValue(formatted);
        } else {
            // Fallback
            setDisplayValue(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, country]);

    const formatPhoneNumber = (val: string) => {
        // Strip non-digits
        const digits = val.replace(/\D/g, '');

        // Standard 10-digit US format (3-3-4)
        const limit = 10;
        const limited = digits.substring(0, limit);

        let formatted = limited;
        if (limited.length > 0) {
            formatted = `(${limited.substring(0, 3)}`;
        }
        if (limited.length >= 3) {
            formatted = `(${limited.substring(0, 3)}) ${limited.substring(3, 6)}`;
        }
        if (limited.length >= 6) {
            formatted = `(${limited.substring(0, 3)}) ${limited.substring(3, 6)}-${limited.substring(6, 10)}`;
        }

        return { formatted, digits: limited };
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow deleting separators naturally
        if (e.key === 'Backspace') {
            // Get cursor position from ref if we had one, but strict React input is tricky.
            // Simpler heuristic: If the value ends with a separator, or we just want to ensure it feels right:
            // The standard 'change' event will trigger.
            // BUT: if cursor is after a separator, standard backspace might not delete the char before it unless we force it.
            // Actually, simplest 'deletable' feel: if the user hits backspace and the regex-stripped digits result is same length
            // as previous, it means they hit a separator. We should proactively slice a digit off.
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const inputType = (e.nativeEvent as InputEvent).inputType; // 'deleteContentBackward' etc.

        let newDigits = val.replace(/\D/g, '');

        // Smart Delete Handling:
        // If the user effectively deleted a separator (digits didn't change count but length reduced or cursor moved),
        // we normally "resist" in strict mode.
        // To allow "deleting" the dash, we check if operation was a delete and digits count resembles no change?
        // Actually, easiest way is: If the input was a delete event, and the raw digits are same as before, 
        // it implies they deleted a formatting char. We should remove the last digit (or digit at cursor).
        // Since cursor tracking is hard without a ref, we'll try a simpler approach often used:
        // Just let it re-format.
        // Wait, user says "dashes and parenthesis should be deletable". 
        // If I have `(555) 555-5555` and backspace `-`, `val` becomes `(555) 5555555`. 
        // `digits` is `5555555555`. Reformat is `(555) 555-5555`. 
        // Result: Dash comes back.

        // FIX: If we detect a delete on a separator position, we remove the digit before it.
        // We'll track previous value.

        const prevDigits = (displayValue || '').replace(/\D/g, '');
        const isDelete = inputType?.includes('delete');

        if (isDelete && newDigits.length === prevDigits.length) {
            // User deleted a non-digit. Remove the last digit to make it "feel" like progress?
            // Or better: remove the digit immediately preceding the deleted char? 
            // Without cursor position, removing the LAST digit is the safest fallback for "end of line" editing.
            newDigits = newDigits.slice(0, -1);
        }

        const { formatted, digits } = formatPhoneNumber(newDigits);

        setDisplayValue(formatted);

        // Emit full E.164 with calling code
        if (digits.length > 0) {
            const callingCode = getCountryCallingCode(country);
            onChange(`+${callingCode}${digits}`);
        } else {
            onChange('');
        }
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value as Country);
        // Clear input on country change to avoid confusion
        onChange('');
        setDisplayValue('');
    };

    const callingCode = getCountryCallingCode(country);

    // Create country options from supported countries list
    // This avoids "Unknown country" errors from codes in locale json that aren't supported
    const countryOptions = getCountries().map((code) => ({
        code,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: (en as any)[code] || code
    })).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-muted-foreground ml-1">
                    {label}
                    {error && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className={`flex h-12 w-full rounded-md border bg-secondary px-3 py-2 text-sm ring-offset-background transition-all duration-200 focus-within:ring-2 focus-within:ring-ring focus-within:ring-primary ${error ? "border-red-500 focus-within:ring-red-500" : "border-input"}`}>

                {/* Country Select + Code Prefix */}
                <div className="flex items-center border-r border-border pr-3 mr-3 relative">
                    <select
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        value={country}
                        onChange={handleCountryChange}
                        aria-label="Select Country"
                    >
                        {countryOptions.map((opt) => (
                            <option key={opt.code} value={opt.code}>
                                {opt.name} +{getCountryCallingCode(opt.code)}
                            </option>
                        ))}
                    </select>

                    {/* Visual Mock of Select */}
                    <div className="flex items-center gap-2 pointer-events-none">
                        <span className="text-lg leading-none">
                            {/* Flag logic could go here, for now just code is fine or use a map */}
                            {country === 'US' ? '🇺🇸' : country}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                            +{callingCode}
                        </span>
                        <span className="text-[10px] opacity-50">▼</span>
                    </div>
                </div>

                <input
                    type="tel"
                    value={displayValue}
                    onChange={handlePhoneChange}
                    placeholder={placeholder}
                    className="bg-transparent border-none w-full h-full focus:outline-none placeholder:text-muted-foreground text-foreground flex-1 tracking-wide font-medium"
                />
            </div>
            {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
}

// Re-export as a compatible name if needed or just usage
export default PhoneInput;
