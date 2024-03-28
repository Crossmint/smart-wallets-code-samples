import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center w-full h-16">
      <a
        className="flex items-center justify-center"
        href="https://github.com/Crossmint"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGithub} className="h-6 w-6 mr-2" />
          <span>Made with</span>
          <FontAwesomeIcon icon={faHeart} className="text-red-500 w-6" />
          <span>by Crossmint</span>
        </div>
      </a>
    </footer>
  );
};

export default Footer;
