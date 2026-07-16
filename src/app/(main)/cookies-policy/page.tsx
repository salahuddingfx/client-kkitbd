"use client";

import { PolicyPage } from "@/components/common";

export default function CookiesPolicyPage() {
  return (
    <PolicyPage
      title="Cookies Policy"
      lastUpdated="January 1, 2024"
      breadcrumbLabel="Cookies Policy"
      intro="KKIT uses cookies and similar tracking technologies to enhance your learning experience, analyze platform usage, and deliver personalized content. This policy explains what cookies we use, why we use them, and how you can manage your preferences."
      items={[
        {
          title: "What Are Cookies",
          content:
            "Cookies are small text files stored on your device by your web browser when you visit a website. They help websites remember your preferences, login status, and browsing activity. KKIT uses cookies to ensure our learning platform functions correctly, remember your course progress, and improve overall user experience across sessions.",
        },
        {
          title: "Types of Cookies We Use",
          content: (
            <>
              <p className="mb-3">
                KKIT employs several categories of cookies to support different aspects of our platform:
              </p>
              <ul>
                <li>
                  <strong>Strictly Necessary Cookies</strong> &mdash; Essential for core platform
                  functionality like authentication and navigation.
                </li>
                <li>
                  <strong>Performance Cookies</strong> &mdash; Collect anonymous data about how
                  learners interact with course content and page layouts.
                </li>
                <li>
                  <strong>Functionality Cookies</strong> &mdash; Remember your language preference,
                  theme settings, and video playback options.
                </li>
                <li>
                  <strong>Targeting Cookies</strong> &mdash; Used to deliver relevant course
                  recommendations and promotional content based on your interests.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Essential Cookies",
          content:
            "Essential cookies are strictly necessary for KKIT to operate. They handle user authentication, maintain your session while navigating between courses, and enable security features like CSRF protection. Without these cookies, you would not be able to log in, access enrolled courses, or submit assignments. These cookies cannot be disabled through our cookie preference center.",
        },
        {
          title: "Analytics and Performance Cookies",
          content:
            "We use analytics cookies to understand how learners engage with our platform, which courses are most popular, and where users encounter difficulties. These cookies collect aggregated, anonymized data such as pages visited, time spent on lessons, and completion rates. This information helps our content team improve course structure and identify areas where additional support materials are needed.",
        },
        {
          title: "Functionality Cookies",
          content:
            "Functionality cookies allow KKIT to remember choices you make and provide enhanced, personalized features. For example, they store your preferred video playback speed, code editor theme, dark or light mode setting, and language selection. If you do not allow these cookies, some or all of these services may not function properly, and you may need to re-enter your preferences each visit.",
        },
        {
          title: "Targeting and Advertising Cookies",
          content:
            "Targeting cookies are used to track your browsing habits across websites and display advertisements and course recommendations that are relevant to your interests. KKIT and our advertising partners use these cookies to build a profile of your learning interests, measure the effectiveness of ad campaigns, and limit the number of times you see a particular promotion. You can opt out of these cookies without affecting your ability to access course content.",
        },
        {
          title: "Session vs Persistent Cookies",
          content: (
            <>
              <p className="mb-3">
                KKIT uses both session-based and persistent cookies depending on the purpose:
              </p>
              <ul>
                <li>
                  <strong>Session Cookies</strong> are temporary and are deleted from your device
                  when you close your browser. They are used to maintain your login state and
                  shopping cart during a single browsing session.
                </li>
                <li>
                  <strong>Persistent Cookies</strong> remain on your device for a predetermined
                  period or until you manually delete them. They help KKIT recognize you on
                  subsequent visits, remember your preferences, and track your long-term course
                  progress.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "First-Party vs Third-Party Cookies",
          content: (
            <>
              <p className="mb-3">
                Cookies on our platform come from two sources:
              </p>
              <ul>
                <li>
                  <strong>First-Party Cookies</strong> are set directly by KKIT and are used
                  exclusively for our platform&apos;s functionality, analytics, and user experience
                  improvements.
                </li>
                <li>
                  <strong>Third-Party Cookies</strong> are set by external services integrated
                  into our platform, such as Google Analytics, payment processors, embedded video
                  players, and social media plugins. These cookies are governed by the respective
                  third party&apos;s privacy policy.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "How We Use Cookie Data",
          content:
            "KKIT uses cookie data to maintain your authentication session, track course enrollment and progress, remember your learning preferences, analyze platform performance, detect and prevent fraudulent activity, and deliver personalized course recommendations. We do not sell cookie data to third parties. All analytics data is processed in aggregate, and we take steps to anonymize information before it is used for reporting purposes.",
        },
        {
          title: "Managing Cookie Preferences",
          content:
            "When you first visit KKIT, a cookie consent banner allows you to accept or customize which cookie categories you permit. You can update your preferences at any time by navigating to the cookie settings link in the footer of any page. Adjusting your preferences will take effect immediately for non-essential cookies. Changes to essential cookie settings are not permitted as they are required for platform operation.",
        },
        {
          title: "Browser Cookie Settings",
          content:
            "Most web browsers allow you to control cookies through their settings menu. You can typically choose to block all cookies, accept all cookies, or receive a notification when a cookie is set. Instructions for managing cookies are available in the help section of each browser. Please note that blocking cookies through your browser may prevent KKIT from functioning correctly, including login, course progress tracking, and assignment submissions.",
        },
        {
          title: "Impact of Disabling Cookies",
          content: (
            <>
              <p className="mb-3">
                If you choose to disable or block certain cookies, you may experience the following
                limitations on KKIT:
              </p>
              <ul>
                <li>Inability to stay logged in between pages or sessions.</li>
                <li>Loss of saved preferences such as theme and playback settings.</li>
                <li>Course progress tracking may be disrupted or lost.</li>
                <li>Personalized recommendations will not be available.</li>
                <li>Interactive lab environments and code playgrounds may not function correctly.</li>
              </ul>
              <p className="mt-3">
                Essential cookies cannot be disabled as they are required for basic platform
                functionality.
              </p>
            </>
          ),
        },
        {
          title: "Google Analytics Cookies",
          content:
            "KKIT uses Google Analytics to collect anonymized information about how visitors use our platform. Google Analytics sets cookies such as <strong>_ga</strong>, <strong>_gid</strong>, and <strong>_gat</strong> to distinguish users and throttle request rates. This data helps us understand traffic patterns, popular courses, and user navigation flows. You can opt out of Google Analytics by installing the Google Analytics Opt-Out Browser Add-on provided by Google.",
        },
        {
          title: "Social Media Cookies",
          content:
            "Our platform includes social media features such as share buttons and embedded content from platforms like YouTube, LinkedIn, and GitHub. These features may set cookies on your device to track your activity across the web and build a profile of your interests. KKIT does not control these third-party cookies. We encourage you to review the cookie policies of these social media platforms for more information about their data practices.",
        },
        {
          title: "Cookie Policy Updates",
          content:
            "KKIT may update this Cookies Policy from time to time to reflect changes in technology, legislation, or our business operations. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you via email or a prominent banner on our platform. We recommend reviewing this policy periodically to stay informed about how we use cookies.",
        },
        {
          title: "Contact Us About Cookies",
          content:
            "If you have any questions, concerns, or requests related to our use of cookies, please reach out to our privacy team at <strong>privacy@kkitbd.com</strong>. You can also submit a data subject access request through our support portal. We aim to respond to all cookie-related inquiries within 5 business days and will work with you to resolve any concerns about your data.",
        },
      ]}
    />
  );
}
