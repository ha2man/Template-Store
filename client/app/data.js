import React from 'react';
//  icons
import {
  FiYoutube,
  FiInstagram,
  FiGithub,
  FiDribbble,
  FiLayout,
  FiSettings,
  FiPenTool,
  FiTag,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';

// companies icons
import FreelancerBrandIcon from './assets/img/brands/freelancer.png';
import UpworkBrandIcon from './assets/img/brands/upwork.png';
import FiverBrandIcon from './assets/img/brands/fiverr.png';
import BehanceBrandIcon from './assets/img/brands/behance.png';
import DribbbleBrandIcon from './assets/img/brands/dribbble.png';

// projects images
import Project1 from './assets/img/projects/p1.png';
import Project2 from './assets/img/projects/p2.png';
import Project3 from './assets/img/projects/p3.png';
import Project4 from './assets/img/projects/p4.png';
import Project5 from './assets/img/projects/p5.png';
import Project6 from './assets/img/projects/p6.png';

// skills images
import SkillImg1 from './assets/img/skills/html5.png';
import SkillImg2 from './assets/img/skills/css3.png';
import SkillImg3 from './assets/img/skills/js.png';
import SkillImg4 from './assets/img/skills/reactjs.png';
import SkillImg5 from './assets/img/skills/nextjs.png';
import SkillImg6 from './assets/img/skills/nodejs.png';
import SkillImg7 from './assets/img/skills/git.png';
import SkillImg8 from './assets/img/skills/figma.png';

// testimonial images
import TestiImage1 from './assets/img/testimonials/testimonial-1.png';
import TestiImage2 from './assets/img/testimonials/testimonial-2.png';
import TestiImage3 from './assets/img/testimonials/testimonial-3.png';

// navigation
export const navigation = [
  {
    name: 'home',
    href: 'home',
  },
  {
    name: 'store',
    href: 'store',
  },
  {
    name: 'about',
    href: 'about',
  },
  {
    name: 'portfolio',
    href: 'portfolio',
  },
  {
    name: 'services',
    href: 'services',
  },
  {
    name: 'testimonials',
    href: 'testimonials',
  },
  {
    name: 'contact',
    href: 'contact',
  }
];

// social
export const social = [
  {
    icon: <FiYoutube />,
    href: '',
  },
  {
    icon: <FiInstagram />,
    href: '',
  },
  {
    icon: <FiGithub />,
    href: '',
  },
  {
    icon: <FiDribbble />,
    href: '',
  },
];

// companies
export const brands = [
  {
    img: FreelancerBrandIcon,
    href: '',
  },
  {
    img: UpworkBrandIcon,
    href: '',
  },
  {
    img: FiverBrandIcon,
    href: '',
  },
  {
    img: BehanceBrandIcon,
    href: '',
  },
  {
    img: DribbbleBrandIcon,
    href: '',
  },
];

// projects
export const projectsData = [
  {
    id: '1',
    image: Project1,
    name: 'Hufra-ECommerce',
    category: 'UI/UX design',
    href: 'https://hufra.com.sg/',
  },
  {
    id: '2',
    image: Project2,
    name: 'Flamingos - Food Street Portfolio',
    category: 'web development',
    href: 'https://flamingosfoodstreet.com/',
  },
  {
    id: '3',
    image: Project3,
    name: 'Mikan - Singapore Based Engg. Portfolio',
    category: 'UI/UX design',
    href: 'http://mikan-groups.com/',
  },
  {
    id: '4',
    image: Project4,
    name: 'Chennai Properties - Real Estate',
    category: 'branding',
    href: 'https://www.chennaiproperties.in/',
  },
  {
    id: '5',
    image: Project5,
    name: 'Insurance',
    category: 'web development',
    href:'https://www.squareinsurance.in/',
  },
  {
    id: '6',
    image: Project6,
    name: 'Grocery Store',
    category: 'web development',
    href:'https://chennaiangadi.com/',
  },
];

// projects
export const projectsNav = [
  {
    name: 'all',
  },
  {
    name: 'UI/UX Design',
  },
  {
    name: 'web development',
  },
  {
    name: 'branding',
  },
];

// skill
export const skills = [
  {
    image: SkillImg1,
  },
  {
    image: SkillImg2,
  },
  {
    image: SkillImg3,
  },
  {
    image: SkillImg4,
  },
  {
    image: SkillImg5,
  },
  {
    image: SkillImg6,
  },
  {
    image: SkillImg7,
  },
  {
    image: SkillImg8,
  },
];

// services
export const services = [
  {
    icon: <FiLayout />,
    name: 'Web Design',
    description:
      'I have extensive experience developing and supporting user workflows, solid UI/UX design background, strong experience using Figma to create wireframes, mockups, prototypes to communicate, develop, and challenge ideas.',
  },
  {
    icon: <FiSettings />,
    name: 'Web Development',
    description:
      'Ive been working with e-commerce, marketplaces, SaaS projects, and as part of a cross-functional delivery team.',
  },
  {
    icon: <FiPenTool />,
    name: 'Branding',
    description:
      'I’m particularly interested in contributing to all areas of the user experience.I’m focused on turning complex concepts into experiences that will help companies reach their audiences in an engaging and innovative way.',
  },
  {
    icon: <FiTag />,
    name: 'SEO',
    description:
      'Im a professional SEO with a proven track-record of helping companies & online stores increase traffic, lead count, sales & grow through SEO.',
  },
];

// testimonials
export const testimonials = [
  {
    authorImg: TestiImage1,
    authorText:
      'SBS is great to work with. Open, good listener, good understanding of UI/UX and made really nice changes to site - will use again. A pleasure to work with."',
    authorName: 'Rylee',
    authorPosition: 'Head of Design, Dukaan',
  },
  {
    authorImg: TestiImage2,
    authorText:
      'It was a pleasure to work with SBS on our project. He has excellent skills and works well with a team of designers and developers. His communication is excellent and timely."',
    authorName: 'Rachel',
    authorPosition: 'CEO, Juno',
  },
  {
    authorImg: TestiImage3,
    authorText:
      'Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.',
    authorName: 'Olivia Doe',
    authorPosition: 'Head of Engg, SEC',
  },
];

// contact
export const contact = [
  {
    icon: <FiMail />,
    title: 'Have a question?',
    subtitle: 'I am here to help you.',
    description: 'Email me at contact@webdesignerpro.store or Call me at +91 9884863148',
  },
  {
    icon: <FiMapPin />,
    title: 'Current Location',
    subtitle: 'BC, Canada',
    description: 'Serving clients worldwide',
  },
];
