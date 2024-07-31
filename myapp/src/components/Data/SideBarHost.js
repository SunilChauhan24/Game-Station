import {
  FaComments,
  FaFileAlt,
  FaGamepad,
  // FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const SideBarHost = (hostId) => [
  // {
  //   title: "Home",
  //   path: `/host/${hostId}/home`,
  //   icon: <FaHome className="text-warning" />,
  //   cName: "nav-text",
  // },
  {
    title: "GameStations",
    icon: <FaGamepad className="text-warning" />,
    path: "/host/gameStations",
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    icon: <FaPhoneAlt className="text-warning" />,
    path: "/host/contactUs",
    cName: "nav-text",
  },
  {
    title: "About Us",
    icon: <FaInfoCircle className="text-warning" />,
    path: "/host/aboutUs",
    cName: "nav-text",
  },
  {
    title: "Feedback",
    icon: <FaComments className="text-warning" />,
    path: "/host/feedback",
    cName: "nav-text",
  },
  {
    title: "FAQs",
    icon: <FaQuestionCircle className="text-warning" />,
    path: "/host/FAQs",
    cName: "nav-text",
  },
  {
    title: "T&C",
    icon: <FaFileAlt className="text-warning" />,
    path: "/host/T&C",
    cName: "nav-text",
  },
];

export default SideBarHost;
