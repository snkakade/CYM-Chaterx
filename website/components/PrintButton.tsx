"use client";

export function PrintButton() {
  return <button className="invoice-print-button" onClick={() => window.print()}>Print / Save PDF</button>;
}
