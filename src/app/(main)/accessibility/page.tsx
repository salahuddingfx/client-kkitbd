"use client";

import { PolicyPage } from "@/components/common";

export default function AccessibilityPage() {
  return (
    <PolicyPage
      title="Accessibility Policy"
      lastUpdated="January 1, 2024"
      breadcrumbLabel="Accessibility"
      intro="KKIT is dedicated to making online education accessible to everyone, regardless of ability. We believe that barriers to learning should be removed, not tolerated. This policy outlines our commitment to accessibility standards, the measures we take to ensure an inclusive platform, and how we continuously improve the experience for all users."
      items={[
        {
          title: "Our Accessibility Commitment",
          content:
            "At KKIT, accessibility is not an afterthought\u2014it is a core design principle. We are committed to ensuring that every learner, instructor, and visitor can fully engage with our platform regardless of physical, cognitive, sensory, or technological limitations. Our team actively incorporates accessibility best practices into every stage of development, from initial design through deployment and ongoing maintenance. We believe that accessible education is better education for everyone.",
        },
        {
          title: "WCAG 2.1 Compliance",
          content: (
            <>
              <p>
                KKIT strives to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1
                at the AA conformance level. These internationally recognized guidelines provide a
                framework for making web content more accessible to people with disabilities.
              </p>
              <ul className="mt-2 space-y-1">
                <li>We conduct quarterly accessibility audits using both automated tools and manual testing</li>
                <li>Our WCAG compliance is validated by third-party accessibility consultants annually</li>
                <li>We track and prioritize accessibility defects with the same urgency as security issues</li>
                <li>Compliance reports are available upon request to institutional partners</li>
              </ul>
            </>
          ),
        },
        {
          title: "Keyboard Navigation",
          content:
            "All interactive elements on KKIT, including navigation menus, course players, forms, buttons, and modals, are fully operable using keyboard input alone. Users can navigate through the platform using Tab, Shift+Tab, Enter, and Escape keys without requiring a mouse or trackpad. We ensure a logical tab order throughout every page and provide visible focus indicators so users always know where they are on the page. Skip-to-content links are available on all pages to allow efficient navigation.",
        },
        {
          title: "Screen Reader Support",
          content:
            "KKIT is designed to work seamlessly with popular screen readers including JAWS, NVDA, VoiceOver, and TalkBack. All page content is properly structured with semantic HTML landmarks, headings, and ARIA labels to ensure screen reader users can navigate and comprehend the platform effectively. Dynamic content changes, such as form validation messages and course progress updates, are announced to assistive technologies in real time. We test every major feature release with at least two screen reader combinations.",
        },
        {
          title: "Visual Accessibility",
          content:
            "We ensure that all visual content on KKIT is perceivable by users with low vision or color vision deficiencies. Text content is presented with sufficient size and contrast, and users can increase text size without breaking the layout. Important information is never conveyed through color alone\u2014we always use additional indicators such as icons, labels, or patterns. Our course video player supports adjustable playback speed and high-contrast mode for optimal viewing.",
        },
        {
          title: "Audio and Video Accessibility",
          content:
            "All video content on KKIT includes captions and transcripts to support deaf and hard-of-hearing learners. Video players offer keyboard controls and are compatible with assistive technologies. Audio descriptions are provided for video content where significant visual information is not covered by the existing narration. We also ensure that auto-playing media can be paused, stopped, or hidden by the user at any time.",
        },
        {
          title: "Captions and Transcripts",
          content: (
            <>
              <p>
                Accurate captions and full transcripts are provided for all pre-recorded audio
                and video content across the platform. Live sessions are accompanied by real-time
                captions powered by AI with human review for accuracy.
              </p>
              <ul className="mt-2 space-y-1">
                <li>Caption accuracy is maintained at 99% or higher through automated and human review processes</li>
                <li>Transcripts include speaker identification, timestamps, and descriptions of non-speech audio</li>
                <li>Real-time captions for live sessions achieve a target latency of under 3 seconds</li>
                <li>Users can report caption errors directly from the video player for rapid correction</li>
              </ul>
            </>
          ),
        },
        {
          title: "Color Contrast Standards",
          content:
            "All text and interactive elements on KKIT meet or exceed the WCAG 2.1 minimum contrast ratios of 4.5:1 for normal text and 3:1 for large text against their background. Our design system enforces these ratios at the component level, preventing low-contrast combinations from reaching production. Icons and graphical elements also meet a minimum 3:1 contrast ratio against adjacent colors. Regular contrast audits ensure these standards are maintained as the platform evolves.",
        },
        {
          title: "Text Resizing and Zoom",
          content:
            "The KKIT platform is designed to remain fully functional and readable when users resize text up to 200% using browser zoom or system-level text scaling. All layouts use responsive design principles that reflow content gracefully without horizontal scrolling or content overlap. Course materials, including code editors and interactive exercises, also support text scaling. We test at multiple zoom levels during every release cycle to ensure no functionality is lost.",
        },
        {
          title: "Accessible Forms",
          content:
            "Every form on KKIT is built with accessibility in mind. All form fields have associated labels, required fields are clearly indicated, and error messages are descriptive and programmatically linked to the relevant inputs. Forms can be completed entirely via keyboard, and our form validation provides real-time feedback that works with screen readers. Complex forms include step-by-step guidance and the ability to save progress for users who need more time.",
        },
        {
          title: "Alternative Text for Images",
          content:
            "All meaningful images across the KKIT platform include descriptive alternative text that conveys the image\u2019s purpose to screen reader users. Decorative images are marked with empty alt attributes so assistive technologies can skip them. Instructors are guided through best practices for adding alt text to course images, including screenshots, diagrams, and charts. We also support long descriptions for complex visual content that requires more explanation.",
        },
        {
          title: "Cognitive Accessibility",
          content: (
            <>
              <p>
                KKIT is designed with cognitive accessibility in mind, featuring clear navigation,
                consistent layouts, and predictable interaction patterns across the platform.
                Content is organized with clear headings, short paragraphs, and plain language.
              </p>
              <ul className="mt-2 space-y-1">
                <li>Navigation patterns remain consistent across all sections of the platform</li>
                <li>Instructions for assignments and assessments are written in plain, jargon-free language</li>
                <li>Progress indicators help learners track their position within courses and modules</li>
                <li>Time limits on assessments can be extended or removed upon request as an accommodation</li>
              </ul>
            </>
          ),
        },
        {
          title: "Assistive Technology Compatibility",
          content:
            "KKIT is tested for compatibility with a wide range of assistive technologies, including screen readers, magnification software, voice recognition tools, and alternative input devices. We follow WAI-ARIA best practices to ensure our custom components work correctly with these tools. Our platform supports the latest versions of major browsers and operating systems, including those with built-in accessibility features. We maintain a public list of tested assistive technology combinations and known limitations.",
        },
        {
          title: "Accessibility Feedback",
          content:
            "We actively welcome and encourage feedback from all users regarding accessibility on KKIT. If you encounter a barrier, have a suggestion for improvement, or need a specific accommodation, please contact our accessibility team at accessibility@kkitbd.com. We aim to acknowledge all accessibility reports within 2 business days and provide a resolution timeline within 5 business days. Critical accessibility barriers that prevent platform use are prioritized for immediate resolution.",
        },
        {
          title: "Continuous Improvement",
          content:
            "Accessibility is a journey, not a destination. KKIT is committed to the ongoing improvement of our platform\u2019s accessibility through regular audits, user testing with people with disabilities, staff training, and staying current with evolving standards and best practices. We publish an annual accessibility report summarizing our progress, identified challenges, and planned improvements. Our accessibility roadmap is shaped in part by feedback from our user community.",
        },
      ]}
    />
  );
}
