import {
  FaBlog,
  FaBook,
  FaBriefcase,
  FaDashcube,
  FaDollarSign,
  FaGamepad,
  FaLaptop,
  FaQuoteRight,
  FaRegComments,
  FaUser,
  FaUserTie,
} from "react-icons/fa";

const SideBarAdmin = (adminId, isSuperUser) => [
  {
    title: "Dashboard",
    path: `/admin/${adminId}/dashboard`,
    icon: <FaDashcube className="text-golden" />,
    cName: "nav-text",
  },
  ...(isSuperUser
    ? [
        {
          title: "Admins",
          path: `/admin/${adminId}/admins`,
          icon: <FaBriefcase className="text-golden" />,
          cName: "nav-text",
        },
      ]
    : []),
  {
    title: "User",
    path: `/admin/${adminId}/users`,
    icon: <FaUser className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Hosts",
    path: `/admin/${adminId}/hosts`,
    icon: <FaUserTie className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Bookings",
    path: `/admin/${adminId}/bookings`,
    icon: <FaBook className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Quotes",
    path: `/admin/${adminId}/quotes`,
    icon: <FaQuoteRight className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Feedback",
    path: `/admin/${adminId}/feedbacks`,
    icon: <FaRegComments className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Blogs",
    path: `/admin/${adminId}/blogs`,
    icon: <FaBlog className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Games",
    path: `/admin/${adminId}/games`,
    icon: <FaGamepad className="text-golden" />,
    cName: "nav-text",
  },
  {
    title: "Payments",
    path: `/admin/${adminId}/payments`,
    icon: <FaDollarSign className="text-golden" />,
    cName: "nav-text text-dark",
  },
  {
    title: "GameStations",
    icon: <FaLaptop className="text-golden" />,
    path: `/admin/${adminId}/gameStations`,
    cName: "nav-text",
  },
];

export default SideBarAdmin;
