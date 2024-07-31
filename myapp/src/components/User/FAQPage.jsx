import React, { useState } from "react";
import { FAQs } from "./FAQs";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <>
      <div className="bg-warning bg-opacity-10" style={{ minHeight: "100vh" }}>
        <div className="container py-5">
          <h1 className="text-center mb-4">Frequently Asked Questions</h1>
          <div className="accordion" id="faqAccordion">
            {FAQs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2
                  className="accordion-header"
                  id={`heading${index}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <button
                    className={`accordion-button ${
                      openIndex === index ? "" : "collapsed"
                    }`}
                    type="button"
                    aria-expanded={openIndex === index ? "true" : "false"}
                    aria-controls={`collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${
                    openIndex === index ? "show" : ""
                  }`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="text-center mt-5">
            For more questions, contact us via email:{" "}
            <Link to="mailto:playways83@gmail.com">playways83@gmail.com</Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
