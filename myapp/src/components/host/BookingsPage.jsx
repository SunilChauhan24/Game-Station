import React from "react";

const BookingsPage = () => {
  // Dummy booking data for demonstration
  const bookings =[
    {
      id: 1,
      name: "John Doe",
      date: "2023-12-30",
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: 3,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 4,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "pending",
      paymentStatus: "in process",
    },
    {
      id: 5,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "rejected",
      paymentStatus: "",
    },
    {
      id: 6,
      name: "John Doe",
      date: "2023-12-30",
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 7,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: 8,
      name: "John Doe",
      date: "2023-12-30",
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 9,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: 10,
      name: "John Doe",
      date: "2023-12-30",
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 11,
      name: "Jane Smith",
      date: "2023-12-31",
      status: "pending",
      paymentStatus: "pending",
    },
  ];

  const handleCheckBooking = (id) => {
    const selectedBooking = bookings.find((booking) => booking.id === id);
    console.log("Selected Booking:", selectedBooking);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 display-4">Bookings</h2>
      <div
        className="table-responsive"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
                <td>{booking.paymentStatus}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleCheckBooking(booking.id)}
                  >
                    Check Booking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
