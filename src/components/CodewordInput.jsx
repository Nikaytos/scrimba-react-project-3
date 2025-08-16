import { useEffect, useRef, useState } from "react";
import { verifyCodeword } from "../ai.js";


export default function CodewordInput({ value, onChange, onStatusChange }) {
    const [status, setStatus] = useState(null);
    const debounceRef = useRef(null);
    const reqIdRef = useRef(0);

    useEffect(() => {
        onStatusChange?.(status);
    }, [status, onStatusChange]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        const trimmed = value.trim();
        if (!trimmed) {
            setStatus(null);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            const id = ++reqIdRef.current;
            try {
                const ok = await verifyCodeword(trimmed);
                if (id === reqIdRef.current) setStatus(ok ? "ok" : "error");
            } catch {
                if (id === reqIdRef.current) setStatus("error");
            }
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [value]);

    return (
        <div className="codeword">
            <label htmlFor="codeword">Access code</label>
            <div className="field">
                <input
                    id="codeword"
                    type="password"
                    placeholder="Enter codeword"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={status === "error"}
                />
            </div>
            <div
                className={`status ${
                    status === "ok" ? "ok" : status === "error" ? "error" : ""
                }`}
            >
                {status === "ok"
                    ? "Code accepted"
                    : status === "error"
                        ? "Invalid code"
                        : "Enter the access code to use the app"}
            </div>
        </div>
    );
}
