import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Shipping Calculator",
  description: "Calculate your CBM and shipping cost from China to Oman instantly.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
