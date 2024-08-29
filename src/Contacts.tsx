import FbIcon from "./assets/fb";
import TwitterIcon from "./assets/Twitter";
import InstagramIcon from "./assets/Instagram";
import EmailIcon from "./assets/Email";

function Contacts() {
  return (
    <section id="contacts">
      <div className="container text-center">
        <a
          href="https://www.facebook.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <FbIcon />
        </a>
        <a
          href="https://www.facebook.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.facebook.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <TwitterIcon />
        </a>
        <a
          href="mailto:pbagagunio@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <EmailIcon />
        </a>
      </div>
    </section>
  );
}

export default Contacts;
