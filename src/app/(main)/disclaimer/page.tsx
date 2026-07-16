"use client";

import { PolicyPage } from "@/components/common";

export default function DisclaimerPage() {
  return (
    <PolicyPage
      title="Disclaimer"
      lastUpdated="January 1, 2024"
      breadcrumbLabel="Disclaimer"
      intro="This disclaimer outlines the terms and limitations applicable to all content, services, and information provided by KKIT. By using our platform, you acknowledge and agree to the disclaimers set forth below."
      items={[
        {
          title: "1. General Information Disclaimer",
          content:
            "All information provided on the KKIT platform, including but not limited to course descriptions, syllabi, pricing, and promotional materials, is provided for general informational purposes only. KKIT makes every effort to ensure the accuracy and completeness of this information, but we make no warranties or representations, express or implied, regarding its accuracy, reliability, or completeness. Information may be subject to change without prior notice at any time.",
        },
        {
          title: "2. Course Content Accuracy",
          content:
            "KKIT works diligently with subject matter experts and instructors to develop accurate and up-to-date course content. However, the technology landscape evolves rapidly, and some course material may become outdated over time. KKIT does not guarantee that all course content reflects the most current industry standards, software versions, or best practices at the time of access. Learners are encouraged to supplement their coursework with current industry resources and documentation.",
        },
        {
          title: "3. Professional Advice Disclaimer",
          content:
            "Content provided through KKIT courses is intended for educational and informational purposes only and does not constitute professional advice of any kind. The information presented should not be relied upon as a substitute for professional consultation in fields such as law, finance, medicine, engineering, or any other regulated profession. Always seek the guidance of a qualified professional before making decisions based on educational content from any online platform.",
        },
        {
          title: "4. Earnings and Results Disclaimer",
          content:
            "Any references to potential earnings, career outcomes, salary expectations, or professional results on the KKIT platform are estimates provided for illustrative purposes only. Individual results vary based on numerous factors including prior experience, effort applied, market conditions, and geographic location. KKIT makes no guarantees that completing any course will result in specific income levels, employment opportunities, career advancement, or any other measurable outcome.",
        },
        {
          title: "5. Testimonials Disclaimer",
          content:
            "Testimonials and reviews displayed on the KKIT platform represent the individual experiences and opinions of past learners. These testimonials are not intended to represent or guarantee that any individual will achieve the same or similar results. Past performance of any learner is not a reliable indicator of future outcomes. Testimonials may be edited for length, clarity, or grammar while preserving the original intent and meaning.",
        },
        {
          title: "6. External Links Disclaimer",
          content:
            "The KKIT platform and course content may contain hyperlinks to third-party websites, tools, or resources for supplementary reference. KKIT does not endorse, control, or assume responsibility for the content, privacy practices, or accuracy of any external websites or resources. Accessing external links is done entirely at your own risk, and you should review the applicable terms and policies of any third-party site before engaging with its content.",
        },
        {
          title: "7. User Responsibility",
          content:
            "Users of the KKIT platform are solely responsible for their own learning outcomes, code quality, project implementations, and professional development. KKIT provides the educational framework and resources, but the effort, practice, and application required to achieve personal or professional goals rests entirely with the individual learner. Users must also ensure their use of the platform complies with all applicable laws and regulations in their jurisdiction.",
        },
        {
          title: "8. Technology Disclaimer",
          content:
            "KKIT relies on modern web technologies, cloud infrastructure, and third-party services to deliver its courses and learning experiences. While we strive to ensure broad compatibility, KKIT does not guarantee uninterrupted or error-free operation across all devices, browsers, operating systems, or network configurations. Users may occasionally experience compatibility issues due to software updates, browser changes, or device-specific limitations beyond KKIT's control.",
        },
        {
          title: "9. Availability and Uptime",
          content:
            "KKIT aims to maintain high availability of its platform and course content. However, scheduled maintenance, software updates, security patches, and unforeseen technical issues may temporarily affect platform access. KKIT is not liable for any interruption, delay, or unavailability of services, nor for any data loss, however caused. Users should maintain local backups of any critical work produced during their courses.",
        },
        {
          title: "10. Third-Party Tools and Services",
          content:
            "Certain KKIT courses integrate or reference third-party tools, software, APIs, or cloud services that are not owned or operated by KKIT. The availability, pricing, terms of service, and functionality of these third-party tools are subject to change at the discretion of their respective providers. KKIT is not responsible for any changes, disruptions, or discontinuations of third-party tools that may affect your course experience or project workflow.",
        },
        {
          title: "11. Certification Recognition",
          content:
            "Certificates of completion issued by KKIT are intended to recognize your educational achievement within the KKIT learning ecosystem. While KKIT designs its curriculum to align with industry-relevant skills and knowledge, its certificates may not be recognized by all employers, educational institutions, or professional licensing bodies. The recognition and value of KKIT certificates depend on the specific requirements and policies of individual organizations and jurisdictions.",
        },
        {
          title: "12. Job Placement Disclaimer",
          content:
            "KKIT may provide career guidance resources, job market insights, or networking opportunities as supplementary features of certain programs. However, KKIT does not guarantee job placement, employment, internships, or freelance opportunities for any learner. Any career outcomes referenced on the platform reflect general industry trends and individual user experiences, not guaranteed results. Ultimate employment outcomes depend on many factors outside KKIT's control.",
        },
        {
          title: "13. AI-Generated Content",
          content:
            "Some KKIT courses or platform features may incorporate AI-generated content, including but not limited to text summaries, code suggestions, quiz questions, or personalized recommendations. While we strive for accuracy, AI-generated content may occasionally contain errors, inaccuracies, or biases. Users should verify AI-generated outputs independently and not rely on them as the sole source of truth for critical tasks, academic submissions, or production-level code.",
        },
        {
          title: "14. Investment and Financial Disclaimer",
          content:
            "Any content within KKIT courses related to investment, financial markets, cryptocurrency, trading strategies, or business valuation is provided strictly for educational purposes. Such content does not constitute financial advice, investment recommendations, or endorsements of any specific securities, financial instruments, or business ventures. Users should consult a licensed financial advisor before making any investment or financial decisions based on course material.",
        },
        {
          title: "15. Fitness for Purpose",
          content:
            "KKIT makes no representation or warranty that its courses and content are suitable or fit for any particular purpose, job role, or career objective. Courses are designed to provide general education and skill development within their respective domains. It is the user's responsibility to evaluate whether a particular course aligns with their personal learning goals, professional requirements, and organizational standards before enrollment.",
        },
        {
          title: "16. Errors and Omissions",
          content:
            "Despite our commitment to quality and accuracy, the KKIT platform and its course content may inadvertently contain typographical errors, factual inaccuracies, omissions, or outdated information. KKIT reserves the right to correct any such errors or omissions at any time without prior notice. If you identify an error in any course material, we encourage you to report it through the platform so that our content team can review and address it promptly.",
        },
        {
          title: "17. Contact Us",
          content:
            "If you have any questions, concerns, or feedback regarding this disclaimer or any content on the KKIT platform, please do not hesitate to contact us. You can reach the KKIT team through our official support email at support@kkitbd.com, via the in-platform help center, or through the contact form on our website. We are committed to addressing all inquiries promptly and transparently.",
        },
      ]}
    />
  );
}
