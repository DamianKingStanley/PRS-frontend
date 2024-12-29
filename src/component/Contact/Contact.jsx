import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import email from "../../assets/email.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import LinkedIn from "../../assets/linkedin.png";
import whatsapp from "../../assets/whatsapp.png";

const Contact = () => {
  return (
    <div>
      <section className="contact_me">
        <h1>Contact Admin</h1>
        <section className="contactme">
          <div id="cm">
            <Link to="mailto:damianstanley76@gmail.com">
              <img src={email} alt="" />
            </Link>
            <h5>Email</h5>
            <br />
          </div>

          <div id="cm">
            <Link to="https://wa.me/2349081090810">
              <img src={whatsapp} alt="" />
            </Link>
            <h5>WhatsApp</h5>
            <br />
          </div>

          <div id="cm">
            <Link to="https://www.facebook.com/damian.stanley.906">
              <img src={facebook} alt="" />
            </Link>
            <h5>Facebook</h5>

            <br />
          </div>
          <div id="cm">
            <Link to="https://www.linkedin.com/in/damian-stanley-ba6aa422a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=andriod_app">
              <img src={LinkedIn} alt="" />
            </Link>
            <h5>LinkedIn</h5>

            <br />
          </div>
          <div id="cm">
            <Link to="https://www.instagram.com/inkynovelwritersacademy?igsh=YWN3aDdWOGwxYjJ1">
              <img src={instagram} alt="" />
            </Link>
            <h5>Instagram</h5>

            <br />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Contact;
