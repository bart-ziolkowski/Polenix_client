import React, { useForm } from "react-hook-form";
import '../styles/ContactForm.css';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const toastifySuccess = () => {
        toast("Form has just been sent!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          toastId: "notifyToast",
        });
    };

    const onSubmit = async (data) => {
        const { name, email, subject, message } = data;
        try {
            const templateParams = {
                name,
                email,
                subject,
                message,
            };
            await emailjs.send(
              "service_l1cwcfi",
              "emailTemplate",
              templateParams,
              "VnjdbR45Z1tYUomNg"
            );
            reset();
            toastifySuccess();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="ContactForm">
            <h2>Feel free to contact us</h2>
            <div className="form-container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="contactForm">
                            <form
                                id="contact-form"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <div className="row formRow">
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            name="name"
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "Please enter your name",
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: "Please use 30 characters or less",
                                                },
                                            })}
                                            className="form-control formInput"
                                            placeholder="Name"
                                        ></input>
                                        {errors.name && (
                                            <span className="errorMessage">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="email"
                                            name="email"
                                            {...register("email", {
                                                required: true,
                                                pattern:
                                                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            })}
                                            className="form-control formInput"
                                            placeholder="Email address"
                                        ></input>
                                        {errors.email && (
                                            <span className="errorMessage">
                                                Please enter a valid email address
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Row 2 of form */}
                                <div className="row formRow">
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="subject"
                                            {...register("subject", {
                                                required: {
                                                    value: true,
                                                    message: "Please enter a subject",
                                                },
                                                maxLength: {
                                                    value: 75,
                                                    message: "Subject cannot exceed 75 characters",
                                                },
                                            })}
                                            className="form-control formInput"
                                            placeholder="Subject"
                                        ></input>
                                        {errors.subject && (
                                            <span className="errorMessage">
                                                {errors.subject.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Row 3 of form */}
                                <div className="row formRow">
                                    <div className="col">
                                        <textarea
                                            rows={3}
                                            name="message"
                                            {...register("message", {
                                                required: true,
                                            })}
                                            className="form-control formInput"
                                            placeholder="Message"
                                        ></textarea>
                                        {errors.message && (
                                            <span className="errorMessage">
                                                Please enter a message
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button className="submit-btn" type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm