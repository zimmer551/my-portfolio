import nykaaLogoFirst from "Images/tcs-logo-first.png";
import nykaaLogoRest from "Images/tcs-logo-rest.png";

import tailoredTechLogoFirst from "Images/tailoredtech-logo-first.png";
import tailoredTechLogoRest from "Images/tailoredtech-logo-rest.png";

import wfhLogoFirst from "Images/wfh-logo-first.png";
import wfhLogoRest from "Images/wfh-logo-rest.png";

import mitLogoFirst from "Images/galgotia-logo-first.png";
import mitLogoRest from "Images/galgotia-logo-rest.png";

import nykaaBackgroundImage from "Images/background/backgroung-image-reasearch.png";
import tailoredTechBackgroundImage from "Images/background/background-image-tailoredtech.jpg";
import collegeBackgroundImage from "Images/background/background-image-college.jpg";

export const timelineListValue = [
  {
    id: "connected_Clinical_Trials",
    companyName: "Tata Consultancy Services",
    link: "https://www.tcs.com/",
    position: "Frontend Developer",
    duration: "July 2019 - Present",
    location: "Noida",
    roleDetail:
      "In TCS I got to work as a React frontend developer, worked on production bugs and features.",
    companyDetail: "TCS is best in IT industry",
    firstLogo: nykaaLogoFirst,
    restLogo: nykaaLogoRest,
    restMargin: 26, // the secound image margin because logo length is different
    backgroundImage: nykaaBackgroundImage,
    projects: ["CCT"],
  },
  {
    id: "tailoredtech",
    companyName: "Work from home",
    link: "",
    position: "Frontend Developer",
    duration: "",
    location: "Home",
    roleDetail: "I like to explore frontend technologies in my free time.",
    companyDetail: "",
    firstLogo: wfhLogoFirst,
    restLogo: wfhLogoRest,
    restMargin: 34,
    backgroundImage: tailoredTechBackgroundImage,
    projects: [
      "myProject_1",
      "myProject_2",
      "myProject_3",
      "myProject_4",
      "myProject_5",
      "myProject_6",
    ],
  },
  {
    id: "mit",
    companyName: "Galgotias College",
    position: "Electronics and Instrumentation Engineering",
    duration: "2015 - 2019",
    location: "Gr. Noida",
    roleDetail: "",
    companyDetail: "",
    firstLogo: mitLogoFirst,
    restLogo: mitLogoRest,
    restMargin: 37,
    backgroundImage: collegeBackgroundImage,
    projects: ["microcontrollers"],
  },
];
