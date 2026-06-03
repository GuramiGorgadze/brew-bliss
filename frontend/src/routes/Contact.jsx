import { useEffect, useState } from 'react';
import { useUserData } from '../context/UserContext.jsx';
import { PageTitle, InstagramCarousel } from '../components';
import { useLoader } from '../context/LoaderContext';
import Facebook from '../assets/icons/facebook-icon.svg';
import Twitter from '../assets/icons/twitter-icon.svg';
import Instagram from '../assets/icons/instagram-icon.svg';
import TikTok from '../assets/icons/tiktok-icon.svg';
import wing1 from '../assets/wing1.png';
import wing2 from '../assets/wing2.png';

function Contact() {
  const { useFakeLoader } = useLoader();
  const { userData } = useUserData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    useFakeLoader();
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.firstName && userData.lastName) {
        setName(`${userData.firstName} ${userData.lastName}`);
      } else if (userData.firstName) {
        setName(userData.firstName);
      }

      if (userData.email) setEmail(userData.email);

      if (userData.address?.phone) setPhone(userData.address.phone);
    }
  }, [userData]);

  return (
    <div className="contact">
      <PageTitle pageName="Contact"></PageTitle>

      <div className="contact__cards">
        <div className="card">
          <div className="card__image-wrapper">
            <i className="bi bi-telephone"></i>
          </div>

          <h2 className="card__title">Customer Service</h2>

          <div className="card__desc">
            <h6 className="card__desc--heading">+995 557 70 40 22</h6>
            <p className="card__desc--info">Call us from 8am to 8pm</p>
          </div>
        </div>

        <div className="card">
          <div className="card__image-wrapper">
            <i className="bi bi-chat-left"></i>
          </div>

          <h2 className="card__title">Live Chat</h2>

          <div className="card__desc">
            <h6 className="card__desc--heading">Live Chat Available</h6>
            <p className="card__desc--info">Daily: 10am to 10pm</p>
          </div>
        </div>

        <div className="card">
          <div className="card__image-wrapper">
            <i className="bi bi-envelope"></i>
          </div>

          <h2 className="card__title">Write to us</h2>

          <div className="card__desc">
            <h6 className="card__desc--heading">g.gorgadze111@gmail.com</h6>
            <p className="card__desc--info">Any Time</p>
          </div>
        </div>

        <div className="card">
          <div className="card__image-wrapper">
            <i className="bi bi-person"></i>
          </div>

          <h2 className="card__title">Follow Us</h2>

          <div className="card__desc">
            <div className="footer__socials">
              <a
                className="footer__socials-link"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={Facebook}
                  alt="Facebook"
                />
              </a>
              <a
                className="footer__socials-link"
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={Twitter}
                  alt="Twitter"
                />
              </a>
              <a
                className="footer__socials-link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={Instagram}
                  alt="Instagram"
                />
              </a>
              <a
                className="footer__socials-link"
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={TikTok}
                  alt="TikTok"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="get-in-touch">
        <div className="get-in-touch__left">
          <div className="get-in-touch__left--title">
            <img
              src={wing1}
              alt=""
              className="get-in-touch__left--wing"
            />
            <p>Get In Touch</p>
            <img
              src={wing2}
              alt=""
              className="get-in-touch__left--wing"
            />
          </div>

          <div className="get-in-touch__left--desc">
            <p>Open Mon-Fri 10 AM-9 PM, Sat 10-6 PM, Closed on Sundays.</p>
          </div>

          <div className="get-in-touch__left--input">
            <i className="bi bi-person"></i>
            <input
              maxLength={50}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="get-in-touch__left--input">
            <i className="bi bi-envelope"></i>
            <input
              maxLength={50}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="get-in-touch__left--input">
            <i className="bi bi-telephone"></i>
            <input
              maxLength={50}
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <textarea
            className="get-in-touch__left--input textarea"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="get-in-touch__left--btn">Send Message</button>
        </div>

        <div className="get-in-touch__right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4331.924196774486!2d44.787244022924135!3d41.70297947374056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cdb009791db%3A0x597056344cd2ce7f!2sRustaveli%20M%2FS!5e0!3m2!1sen!2sge!4v1780342786787!5m2!1sen!2sge"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default Contact;
