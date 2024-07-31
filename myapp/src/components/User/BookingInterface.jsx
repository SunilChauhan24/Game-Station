import React, { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import "../Assets/CSS/UserGsSearch.css";
import ReactDatePicker from "react-datepicker";
import userApis from "../apis/UserApis";
import ToastMessages from "../ToastMessages";
import Logo from "../imgs/Logo.png";
// import Razorpay from "razorpay";

const BookingInterface = () => {
  const navigate = useNavigate();
  const { stationId, gameId } = useParams();
  const [gameData, setGameData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Play Ways - Add Booking";
  }, []);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await userApis.getGamedata(stationId, gameId);
        setGameData(response.data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [stationId, gameId]);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      setSlots([]);
      if (!selectedDate) return;
      const formattedDate = new Date(selectedDate);
      formattedDate.setDate(formattedDate.getDate() + 1);
      formattedDate.setHours(0, 0, 0, 0);
      const formattedDateString = formattedDate.toISOString().split("T")[0];

      const response = await userApis.fetchSlots(
        stationId,
        gameId,
        formattedDateString
      );
      setSlots(response.data.slots);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching slots:", error);
    }
  }, [selectedDate, stationId, gameId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const paymentHandler = async () => {
    try {
      setLoading(true);
      const response = await userApis.createRazorpayOrder({
        amount: gameData.slotPrice * 100,
      });

      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_KEY,
        amount: gameData.slotPrice * 100,
        currency: "INR",
        description: "Pay for Booking complete.",
        image: Logo,
        order_id: response.data.orderId,
        callback_url: `${process.env.REACT_APP_baseUrl}/payment/paymentVerification`,
        handler: async function (response) {
          console.log("Payment success");
          const paymentResponse = response
          handleSubmit(paymentResponse);

        },
        prefill: {
          name: "Playaways team",
          email: "playways83@gmail.com",
        },
        notes: {
          address: "Razorpay corporate office",
        },
        theme: {
          color: "#f0ac0b",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

      
    } catch (error) {
      console.error("Error initiating payment:", error);
      setToast({
        show: true,
        type: "error",
        message: "Error initiating payment.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (paymentResponse) => {
  

    const slotTiming = selectedSlot
      ? `${selectedSlot.timefrom} - ${selectedSlot.timeto}`
      : "";

    // paymentHandler();

    const bookingData = {
      userId: userId,
      slotDate: selectedDate.toISOString(),
      duration: gameData.time,
      game: gameId,
      paymentStatus: "successfull",
      status: "confirmed",
      slotTiming: slotTiming,
    };

    try {
      
      const payment = {
        userId,
        gsId: stationId,
        currency: "INR",
        amount: gameData.slotPrice,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature
      };

      const response = await userApis.savePayment(payment);
      const pId = response.data.payment._id

      const bookingResponse = await userApis.addBookings(
        stationId,
        bookingData
      );

      const updatedBookingData = {
        bookingid: bookingResponse.data.booking._id,
        paymentid: pId,
        status: "Booked",
      };

      await userApis.updateBookingIdinSlot(
        selectedSlot._id,
        updatedBookingData
      );

      setToast({
        show: true,
        type: "success",
        message: "Booking created successfully.",
      });

      console.log("Booking created successfully:");

      setSelectedDate(null);
      setSelectedSlot(null);
      setSlots([]);
      fetchSlots();
      navigate(`/bookings`);
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: "Error in Booking.",
      });
      console.error("Error creating booking:", error);
    }
  };

  return (
    <>
      <div id="bg-booking">
        <div className="container">
          <div
            className="row d-flex justify-content-center align-items-center "
            style={{ minHeight: "90vh" }}
          >
            <div className="col-md-8 ">
              <div className="card shadow-lg ">
                <div className="card-body">
                  <h2 className="card-title mb-4 text-lg-center">
                    Confirm Your Booking
                  </h2>
                  <hr />
                  <h4 className="card-title">
                    Game : {gameData.game && gameData.game.name}
                  </h4>
                  <p className="card-text text-muted">{gameData.description}</p>
                  <p className="card-text">Time : {gameData.time} minutes</p>
                  <p className="card-text">
                    Price : <b>{gameData.slotPrice}</b>
                  </p>{" "}
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <label htmlFor="datePicker" className="form-label">
                          Date :
                        </label>{" "}
                        <ReactDatePicker
                          className="form-control"
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          minDate={new Date()}
                          maxDate={
                            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select the date"
                        />
                      </div>
                    </div>
                    {selectedDate && !loading && (
                      <>
                        {slots.length > 0 ? (
                          <div className="row row-cols-1 row-cols-md-4">
                            {slots.map((slotGroup, index) => (
                              <React.Fragment key={index}>
                                {slotGroup.slots.map((slot, slotIndex) => (
                                  <div
                                    className="col"
                                    key={`${index}-${slotIndex}`}
                                  >
                                    {loading && <p>Loading...</p>}
                                    <button
                                      type="button"
                                      className={`btn m-1 rounded-pill ${
                                        slot.status === "Booked"
                                          ? "active disabled btn-secondary"
                                          : slot === selectedSlot
                                          ? "btn-primary"
                                          : "btn-outline-primary"
                                      }`}
                                      onClick={() => handleSlotClick(slot)}
                                      disabled={slot.status === "Booked"}
                                    >
                                      {slot.timefrom} - {slot.timeto}
                                    </button>
                                  </div>
                                ))}
                              </React.Fragment>
                            ))}
                          </div>
                        ) : (
                          <p>No slots available for the selected date</p>
                        )}
                      </>
                    )}
                    <hr />
                    <div className="row">
                      <div className="col-md-12 text-end">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() =>
                            navigate(`/gameStation/${stationId}/games`)
                          }
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-golden"
                          onClick={paymentHandler}
                          disabled={loading} 
                        >
                          {loading ? "Processing..." : "Book Now"}{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastMessages
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          type={toast.type}
          message={toast.message}
        />
      </div>
    </>
  );
};

export default BookingInterface;
