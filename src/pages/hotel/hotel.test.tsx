import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import HotelPage from "./hotel";

vi.mock("../../hooks/use-fetch-hotel", () => ({
  default: () => ({
    hotel: {
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
    error: null,
    fetchHotels: vi.fn(),
  }),
}));

describe("Hotel Page Component", () => {
  it("should render hotel details correctly", () => {
    render(
      <MemoryRouter>
        <HotelPage />
      </MemoryRouter>
    );

    const hotelName = screen.getAllByText("Homa");
    const hotelDescription = screen.getByText(
      "Tehran Homa Hotel, one of the most prestigious five-star hotels in the capital..."
    );
    const hotelStars = screen.getByText("⭐ 5 Stars");
    const hotelPrice = screen.getByText("Price per Night: $150");
    const hotelFacility = screen.getByText("Free WiFi");

    expect(hotelName).toBeTruthy();
    expect(hotelDescription).toBeTruthy();
    expect(hotelStars).toBeTruthy();
    expect(hotelPrice).toBeTruthy();
    expect(hotelFacility).toBeTruthy();
  });
});
