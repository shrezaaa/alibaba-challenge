import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HotelsList from "./hotels-list";
import React from "react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../hooks/use-fetch-hotels-list", () => ({
  default: () => ({
    hotels: [
      {
        id: 1,
        name: "Homa",
        description:
          "Tehran Homa Hotel, one of the most prestigious five-star hotels in the capital...",
        location: { long: 51.389, lat: 35.689 },
        stars: 5,
        pricePerNight: 150,
        facilities: [
          { id: 1, name: "24/7 Service", icon: "🏨" },
          { id: 2, name: "Restaurant", icon: "🍽️" },
          { id: 3, name: "Free WiFi", icon: "📶" },
          { id: 4, name: "Conference Hall", icon: "🏢" },
        ],
        reviews: [
          {
            id: 1,
            user: "John Doe",
            rating: 5,
            comment: "Great hotel with amazing service!",
          },
          {
            id: 2,
            user: "Emily Smith",
            rating: 4,
            comment: "Loved the breakfast and the view from my room!",
          },
        ],
      },
      {
        id: 2,
        name: "Luxury Palace",
        description: "A luxurious stay with breathtaking views.",
        location: { long: 51.423, lat: 35.731 },
        stars: 4,
        pricePerNight: 200,
        facilities: [
          { id: 1, name: "24/7 Service", icon: "🏨" },
          { id: 2, name: "Restaurant", icon: "🍽️" },
          { id: 3, name: "Free WiFi", icon: "📶" },
          { id: 4, name: "Swimming Pool", icon: "🏊‍♂️" },
        ],
        reviews: [
          {
            id: 1,
            user: "Michael Brown",
            rating: 4,
            comment: "Luxurious and comfortable stay!",
          },
          {
            id: 2,
            user: "Sarah Johnson",
            rating: 5,
            comment: "The views from the room were stunning!",
          },
        ],
      },
    ],
    loading: false,
    error: null,
    fetchHotels: vi.fn(),
  }),
}));

describe("HotelsList Component", () => {
  it("should render the search hotel input", async () => {
    render(
      <MemoryRouter>
        <HotelsList />
      </MemoryRouter>
    );

    const input = await screen.findByTestId("search-input");
    expect(input).toBeTruthy();
    expect(screen.getAllByText("Homa")).toBeTruthy();
  });
});
