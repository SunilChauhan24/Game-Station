import React from "react";
import { Modal as BootstrapModal, Button, Form } from "react-bootstrap";

const CustomModal = ({
  title,
  fields,
  handleSubmit,
  handleClose,
  buttonText,
  showModal,
}) => {
  const handleFormSubmit = () => {
    handleSubmit();
    handleClose(); 
  };

  return (
    <BootstrapModal show={showModal} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form>
          {fields.map((field, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              {field.type === "text" && (
                <Form.Control
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              {field.type === "file" && (
                <Form.Control
                  type="file"
                  onChange={field.onChange}
                />
              )}
              {field.type === "number" && (
                <Form.Control
                  type="number"
                  onChange={field.onChange}
                />
              )}
              {field.type === "phone" && (
                <Form.Control
                  type="tel"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              {field.type === "select" && (
                <Form.Control
                  as="select"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {field.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              )}
              {field.type === "email" && (
                <Form.Control
                  type="email"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="golden" onClick={handleFormSubmit}>
          {buttonText}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default CustomModal;
