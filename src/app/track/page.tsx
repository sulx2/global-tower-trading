import type { Metadata } from "next";
import TrackClient from "./TrackClient";

export const metadata: Metadata = {
  title: "Track Shipment",
  description: "Track your shipment status with your order code.",
};

export default function TrackPage() {
  return <TrackClient />;
}
