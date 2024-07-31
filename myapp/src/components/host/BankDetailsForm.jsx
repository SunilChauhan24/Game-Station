import React, { useState } from "react";
import hostApis from "../apis/HostApis";
import { Link, useNavigate, useParams } from "react-router-dom";

const BankDetailsForm = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifscCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await hostApis.bankDetails(stationId, formData);
      console.log("Bank details added successfully:", response.data);
      setFormData({
        accountHolderName: "",
        accountNumber: "",
        bankName: "",
        branch: "",
        ifscCode: "",
      });

      navigate(`/host/gameStation/${stationId}/payments`);
    } catch (error) {
      console.error("Error adding bank details:", error);
    }
  };

  return (
    <>
      <div className="bg p-3">
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "85vh" }}
          >
            <div className="col-md-6">
              <div className="card p-3 shadow">
                <div className="card-body">
                  <h2 className="mt-3 mb-4 text-center">Bank Details</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="accountHolderName" className="form-label">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="accountHolderName"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="accountNumber" className="form-label">
                        Account Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="branch" className="form-label">
                        Branch
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ifscCode" className="form-label">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="text-center">
                      <Link
                        to={`/host/gameStation/${stationId}/payments`}
                        className="btn btn-secondary me-2"
                      >
                        Back
                      </Link>
                      <button type="submit" className="btn btn-golden">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetailsForm;
