import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HotelsList from "./hotels-list";
import React from "react";

// Mocking the global fetch function
// global.fetch = vi.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () =>
//       Promise.resolve([
//         {
//           id: 1,
//           name: "Homa",
//           description: "Tehran Homa Hotel, one of the most prestigious five-star hotels in the capital...",
//           location: { long: 51.389, lat: 35.689 },
//           stars: 5,
//           pricePerNight: 150,
//           facilities: [
//             { id: 1, name: "24/7 Service", icon: "🏨" },
//             { id: 2, name: "Restaurant", icon: "🍽️" },
//             { id: 3, name: "Free WiFi", icon: "📶" },
//             { id: 4, name: "Conference Hall", icon: "🏢" },
//           ],
//           reviews: [
//             {
//               id: 1,
//               user: "John Doe",
//               rating: 5,
//               comment: "Great hotel with amazing service!",
//             },
//             {
//               id: 2,
//               user: "Emily Smith",
//               rating: 4,
//               comment: "Loved the breakfast and the view from my room!",
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: "Luxury Palace",
//           description: "A luxurious stay with breathtaking views.",
//           location: { long: 51.423, lat: 35.731 },
//           stars: 4,
//           pricePerNight: 200,
//           facilities: [
//             { id: 1, name: "24/7 Service", icon: "🏨" },
//             { id: 2, name: "Restaurant", icon: "🍽️" },
//             { id: 3, name: "Free WiFi", icon: "📶" },
//             { id: 4, name: "Swimming Pool", icon: "🏊‍♂️" },
//           ],
//           reviews: [
//             {
//               id: 1,
//               user: "Michael Brown",
//               rating: 4,
//               comment: "Luxurious and comfortable stay!",
//             },
//             {
//               id: 2,
//               user: "Sarah Johnson",
//               rating: 5,
//               comment: "The views from the room were stunning!",
//             },
//           ],
//         },
//       ]),
//   })
// );

describe("HotelsList Component", () => {
  it("should render the search hotel input", async () => {
    render(<HotelsList />);

    // Find the search input using the test ID
    const input = await screen.findByTestId("search-input");

    // Check if the input element is present
    expect(input).toBeTruthy();
  });

//   it("should display a list of hotels", async () => {
//     render(<HotelsList />);

//     // Wait for the hotels to be rendered
//     await waitFor(() => screen.getByText(/Homa/i));

//     // Check if hotels are rendered
//     expect(screen.getByText(/Homa/i)).toBeInTheDocument();
//     expect(screen.getByText(/Luxury Palace/i)).toBeInTheDocument();
//   });

//   it("should filter hotels based on search input", async () => {
//     render(<HotelsList />);

//     // Wait for the hotels to be rendered
//     await waitFor(() => screen.getByText(/Homa/i));

//     // Simulate typing in the search input
//     const input = screen.getByTestId("search-input");
//     fireEvent.change(input, { target: { value: "Luxury" } });

//     // Check if the filtered hotels are rendered
//     expect(screen.getByText(/Luxury Palace/i)).toBeInTheDocument();
//     expect(screen.queryByText(/Homa/i)).toBeNull();
//   });

//   it("should trigger fetchHotels when refresh button is clicked", async () => {
//     render(<HotelsList />);

//     // Wait for the hotels to be rendered
//     await waitFor(() => screen.getByText(/Homa/i));

//     // Get the refresh button
//     const refreshButton = screen.getByLabelText("Refresh Hotels");

//     // Simulate a click on the refresh button
//     fireEvent.click(refreshButton);

//     // Check if fetch was called
//     expect(global.fetch).toHaveBeenCalledTimes(2); // One call on mount, one on refresh
//   });
});
