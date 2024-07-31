import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Assets/CSS/NoPage.css"

const NoPage = () => {
  useEffect(() => {
    document.title = "404 Not found page";
  }, []);
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-md-12 justify-content-center">
              <div className=" col-md-offset-1 content-center text-center ">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <Link className="link_404">
                    Go to Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoPage;
