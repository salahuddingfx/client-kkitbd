export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  position: string;
  avatar: string;
  bio: string;
  longBio: string;
  email: string;
  experience: string;
  joinedYear: number;
  skills: string[];
  education: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export const team: TeamMember[] = [
  {
    id: "1",
    slug: "ahmed-khan",
    name: "Ahmed Khan",
    position: "Founder & CEO",
    avatar: "/avatars/ahmed.jpg",
    bio: "Visionary leader with 15+ years of experience in technology and education.",
    longBio:
      "Ahmed founded KKIT with a mission to make world-class tech education accessible to everyone in Bangladesh and beyond. With over 15 years of experience leading technology teams at multinational companies, he brings a unique blend of business acumen and technical expertise. Under his leadership, KKIT has grown from a small training center to a full-fledged technology and education platform serving thousands of students and clients worldwide.",
    email: "ahmed@kkitbd.com",
    experience: "15+ years",
    joinedYear: 2018,
    skills: ["Leadership", "Business Strategy", "Product Management", "React", "Cloud"],
    education: "MBA, University of Dhaka | BSc in CSE, BUET",
    location: "Dhaka, Bangladesh",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "2",
    slug: "sarah-johnson",
    name: "Sarah Johnson",
    position: "Head of Education",
    avatar: "/avatars/sarah.jpg",
    bio: "Passionate educator dedicated to creating world-class learning experiences.",
    longBio:
      "Sarah brings a decade of experience in curriculum design and educational technology. She has designed and launched over 50 courses at KKIT, covering topics from beginner programming to advanced machine learning. Her teaching philosophy centers on project-based learning and real-world application, ensuring students are job-ready upon completion. She holds certifications from MIT and Stanford in online education methodology.",
    email: "sarah@kkitbd.com",
    experience: "10+ years",
    joinedYear: 2019,
    skills: ["Curriculum Design", "E-Learning", "Pedagogy", "Data Science", "Python"],
    education: "M.Ed, Stanford University | BSc in Computer Science, MIT",
    location: "Remote / Dhaka",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "3",
    slug: "michael-chen",
    name: "Michael Chen",
    position: "Lead Developer",
    avatar: "/avatars/michael.jpg",
    bio: "Full-stack developer with expertise in modern web technologies.",
    longBio:
      "Michael is the technical backbone of KKIT's development team. He has architected and built scalable systems handling millions of requests daily. With deep expertise in React, Node.js, and cloud infrastructure, he ensures that KKIT's platform is fast, reliable, and secure. He is an active open-source contributor and has mentored dozens of junior developers throughout his career.",
    email: "michael@kkitbd.com",
    experience: "8+ years",
    joinedYear: 2019,
    skills: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
    education: "MS in Computer Science, National University of Singapore",
    location: "Singapore / Remote",
    socialLinks: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "4",
    slug: "emily-davis",
    name: "Emily Davis",
    position: "Design Director",
    avatar: "/avatars/emily.jpg",
    bio: "Award-winning designer creating beautiful and intuitive user experiences.",
    longBio:
      "Emily leads KKIT's design team with a focus on creating beautiful, accessible, and intuitive digital experiences. With a background in industrial design and HCI, she brings a unique perspective to digital product design. Her work has won multiple design awards, and she has been featured in design publications worldwide. She believes great design should be invisible — it should just work.",
    email: "emily@kkitbd.com",
    experience: "9+ years",
    joinedYear: 2020,
    skills: ["UI/UX Design", "Figma", "Design Systems", "Prototyping", "User Research", "Accessibility"],
    education: "MFA in Interaction Design, Rhode Island School of Design",
    location: "Dhaka, Bangladesh",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "5",
    slug: "david-brown",
    name: "David Brown",
    position: "Data Science Lead",
    avatar: "/avatars/david.jpg",
    bio: "Data scientist helping students master the art of data analysis.",
    longBio:
      "David heads KKIT's data science division, bringing cutting-edge AI and machine learning capabilities to both the education platform and client projects. Previously a senior data scientist at Google, he now channels his expertise into creating practical, industry-relevant data science courses. He has published over 20 research papers in top-tier conferences and journals.",
    email: "david@kkitbd.com",
    experience: "12+ years",
    joinedYear: 2020,
    skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis", "NLP", "Computer Vision"],
    education: "PhD in Machine Learning, Carnegie Mellon University",
    location: "Remote",
    socialLinks: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "6",
    slug: "lisa-wang",
    name: "Lisa Wang",
    position: "Marketing Manager",
    avatar: "/avatars/lisa.jpg",
    bio: "Strategic marketer driving growth and brand awareness.",
    longBio:
      "Lisa is the creative force behind KKIT's marketing and brand strategy. With experience at top digital agencies, she has helped KKIT build a strong online presence and community. She specializes in content marketing, social media strategy, and growth hacking. Under her leadership, KKIT's social media following has grown by 500% and student enrollment has tripled.",
    email: "lisa@kkitbd.com",
    experience: "7+ years",
    joinedYear: 2021,
    skills: ["Digital Marketing", "Content Strategy", "SEO", "Social Media", "Brand Management", "Analytics"],
    education: "MBA in Marketing, University of Melbourne",
    location: "Dhaka, Bangladesh",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}
