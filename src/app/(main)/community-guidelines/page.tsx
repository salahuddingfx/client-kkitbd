"use client";

import { PolicyPage } from "@/components/common";

export default function CommunityGuidelinesPage() {
  return (
    <PolicyPage
      title="Community Guidelines"
      lastUpdated="January 1, 2024"
      breadcrumbLabel="Community Guidelines"
      intro="KKIT is a thriving online learning community built on mutual respect, academic integrity, and collaboration. These guidelines ensure every learner and instructor feels safe, valued, and empowered to grow. By participating on our platform, you agree to uphold the standards outlined below."
      items={[
        {
          title: "Our Community Values",
          content:
            "KKIT is founded on the principles of curiosity, respect, and lifelong learning. Every member of our community\u2014whether student, instructor, or staff\u2014is expected to contribute to a positive and supportive learning environment. We believe that the best education happens when people feel welcome and heard. We encourage open dialogue, celebrate diverse perspectives, and hold ourselves accountable to these shared values.",
        },
        {
          title: "Respectful Communication",
          content:
            "All interactions on KKIT should be conducted with courtesy and professionalism. When participating in course discussions, Q&A forums, or live sessions, communicate constructively and consider how your words may impact others. Avoid personal attacks, dismissive language, or任何 form of rudeness. Remember that behind every username is a real person who deserves dignity and respect.",
        },
        {
          title: "Anti-Harassment Policy",
          content:
            "KKIT maintains a zero-tolerance policy toward harassment of any kind. This includes, but is not limited to, bullying, intimidation, doxxing, sexual harassment, hate speech, and threats of violence. Harassment may occur through text, images, audio, video, or any other medium on the platform. Violations will result in immediate action, which may include permanent account termination and reporting to relevant authorities.",
        },
        {
          title: "Inclusive Environment",
          content: (
            <>
              <p>
                We are committed to fostering an inclusive community where individuals of all
                backgrounds, identities, and abilities can learn and teach without barriers.
                Discrimination based on race, ethnicity, gender, sexual orientation, religion,
                disability, age, or any other protected characteristic is strictly prohibited.
                Instructors are encouraged to use inclusive language and design courses that are
                accessible to diverse learners.
              </p>
              <ul className="mt-2 space-y-1">
                <li>Use welcoming and inclusive language in all interactions</li>
                <li>Respect different viewpoints and learning styles</li>
                <li>Avoid assumptions about others\u2019 backgrounds or knowledge levels</li>
                <li>Support peers who may face barriers to participation</li>
              </ul>
            </>
          ),
        },
        {
          title: "Academic Integrity",
          content:
            "Academic honesty is the cornerstone of meaningful learning on KKIT. Students must complete their own work and properly attribute sources when referencing others\u2019 ideas. Submitting someone else\u2019s work as your own, using unauthorized aids during assessments, or sharing exam content outside the platform are serious violations. Instructors should clearly define what constitutes acceptable collaboration for each course.",
        },
        {
          title: "Intellectual Property Respect",
          content:
            "All course materials, including videos, slides, code, and written content, are the intellectual property of their respective instructors and KKIT. You may not record, download, redistribute, or sell any course content without explicit written permission. Course notes and personal study aids created for your own learning are fine, but sharing them publicly undermines the instructors who created them. Respect for intellectual property ensures our instructors can continue producing high-quality educational content.",
        },
        {
          title: "Spam and Self-Promotion",
          content:
            "KKIT forums, discussion boards, and course reviews are not platforms for advertising or unsolicited promotion. Posting spam, repetitive messages, affiliate links, or misleading promotional content is prohibited. Instructors may briefly mention their own relevant courses in context, but overt self-promotion within another instructor\u2019s course or forum is not allowed. Use the designated channels for marketing inquiries.",
        },
        {
          title: "Content Standards",
          content:
            "All content shared on KKIT must be appropriate for a professional learning environment. This means no pornographic material, graphic violence, illegal content, or misinformation presented as fact. Technical discussions should be accurate and helpful. If you share code or resources, ensure they do not contain malware, exploits, or vulnerabilities designed to cause harm. Content that violates these standards will be removed and may lead to account suspension.",
        },
        {
          title: "Constructive Feedback",
          content:
            "Feedback is a vital part of the learning process, and it should always be delivered constructively. When reviewing courses or providing peer feedback, focus on specific, actionable observations rather than vague criticism or personal judgments. Instructors should create an environment where students feel comfortable asking questions without fear of ridicule. A culture of constructive feedback accelerates growth for everyone involved.",
        },
        {
          title: "Privacy and Confidentiality",
          content:
            "Protect the privacy of fellow community members. Do not share personal information about other users, including their real names, contact details, or private conversations, without their explicit consent. Course discussions and direct messages should remain confidential. If you encounter a privacy concern, report it to our support team immediately rather than addressing it publicly. Respecting privacy builds trust within our learning community.",
        },
        {
          title: "Reporting Violations",
          content:
            "If you witness or experience a violation of these guidelines, please report it promptly through our in-platform reporting tool or by emailing community@kkitbd.com. Provide as much detail as possible, including screenshots, links, and descriptions of the incident. All reports are reviewed confidentially by our moderation team. We protect reporters from retaliation and take every report seriously, regardless of the severity of the violation.",
        },
        {
          title: "Consequences of Violations",
          content: (
            <>
              <p>
                Violations of these guidelines will result in consequences proportional to the
                severity and frequency of the offense. Our goal is education and correction,
                but we will not hesitate to protect the safety and integrity of our community.
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Warning:</strong> Provided for first-time minor infractions with guidance on correct behavior</li>
                <li><strong>Temporary Suspension:</strong> Applied for repeated minor violations or moderate offenses</li>
                <li><strong>Permanent Ban:</strong> Reserved for severe violations such as harassment, hate speech, or fraud</li>
                <li><strong>Legal Action:</strong> Pursued when violations involve illegal activity or significant harm</li>
              </ul>
            </>
          ),
        },
        {
          title: "Instructor Responsibilities",
          content:
            "Instructors on KKIT hold a position of trust and are expected to maintain the highest professional standards. This includes delivering course content accurately, responding to student inquiries in a timely manner, creating respectful learning environments, and complying with all platform policies. Instructors must not engage in discriminatory practices, share misleading information about their qualifications, or use the platform primarily for personal financial gain outside of course offerings. Instructors should promptly moderate discussions within their courses and escalate serious issues to KKIT staff.",
        },
        {
          title: "Student Responsibilities",
          content:
            "Students are expected to approach their learning with honesty, effort, and respect. Attend scheduled live sessions when possible, participate thoughtfully in discussions, and submit work that reflects genuine effort. If you are struggling with course material, reach out to your instructor or use the community forums for support rather than resorting to dishonest shortcuts. Students should keep their course enrollment information confidential and not share login credentials with others.",
        },
        {
          title: "Community Moderation",
          content:
            "KKIT employs a combination of automated tools and human moderation to maintain community standards. Our moderation team reviews flagged content, investigates reports, and takes action according to the enforcement guidelines above. Community members are encouraged to self-moderate by reporting issues and supporting positive interactions. Moderators are selected from trusted community members and KKIT staff, and they operate under strict confidentiality and fairness guidelines.",
        },
        {
          title: "Changes to Guidelines",
          content:
            "These community guidelines may be updated periodically to reflect evolving community needs, legal requirements, and platform changes. When significant changes are made, all registered users will be notified via email and an in-platform announcement at least 14 days before the changes take effect. Continued use of KKIT after the effective date constitutes acceptance of the updated guidelines. You can always find the current version of these guidelines on our website.",
        },
      ]}
    />
  );
}
