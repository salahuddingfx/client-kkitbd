"use client";

import { PolicyPage } from "@/components/common";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      lastUpdated="January 15, 2025"
      breadcrumbLabel="Privacy Policy"
      intro="At KKIT, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our online learning platform and related services."
      items={[
        {
          title: "1. Information We Collect",
          content: `We collect information that you provide directly and information generated through your use of our platform. The categories of personal data we process include:

<ul>
<li><strong>Identity Data:</strong> Full name, date of birth, gender, and profile photograph.</li>
<li><strong>Contact Data:</strong> Email address, phone number, and mailing address.</li>
<li><strong>Account Data:</strong> Username, password (stored in hashed form), and account preferences.</li>
<li><strong>Learning Data:</strong> Course enrollments, progress tracking, quiz results, assignment submissions, and completion records.</li>
<li><strong>Payment Data:</strong> Billing address, transaction history, and payment method details (processed through secure third-party payment processors).</li>
<li><strong>Technical Data:</strong> IP address, browser type and version, operating system, device identifiers, and usage logs.</li>
<li><strong>Communication Data:</strong> Records of correspondence with our support team, feedback, and survey responses.</li>
</ul>`,
        },
        {
          title: "2. How We Collect Your Data",
          content: `We collect personal information through various channels and methods to provide and improve our services:

<ul>
<li><strong>Directly from you:</strong> When you create an account, enroll in courses, complete profile forms, participate in discussions, or contact our support team.</li>
<li><strong>Automatically:</strong> Through cookies, server logs, and similar technologies when you browse our platform, watch lectures, or interact with course materials.</li>
<li><strong>From third parties:</strong> Payment processors for transaction confirmations, social login providers when you use OAuth authentication, and analytics partners who help us understand platform usage.</li>
<li><strong>From educators:</strong> Course creators may provide student progress data and completion records that we store on their behalf.</li>
</ul>

We do not collect data from minors under the age of 16 without verifiable parental consent.`,
        },
        {
          title: "3. How We Use Your Information",
          content: `We use your personal data for the following purposes:

<ul>
<li><strong>Service Delivery:</strong> To provide, maintain, and improve our learning platform, process course enrollments, track your learning progress, and deliver educational content.</li>
<li><strong>Account Management:</strong> To create and manage your user account, authenticate your identity, and provide customer support.</li>
<li><strong>Communication:</strong> To send course-related notifications, platform updates, promotional offers, and respond to your inquiries.</li>
<li><strong>Personalization:</strong> To recommend courses, customize your learning experience, and display relevant content based on your interests and progress.</li>
<li><strong>Analytics and Improvement:</strong> To analyze usage patterns, diagnose technical issues, conduct A/B testing, and develop new features.</li>
<li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
<li><strong>Fraud Prevention:</strong> To detect, prevent, and address fraudulent activity, security breaches, and unauthorized access to our systems.</li>
</ul>`,
        },
        {
          title: "4. Legal Basis for Processing",
          content: `Under applicable data protection laws, including the General Data Protection Regulation (GDPR) and the Bangladesh Digital Security Act 2018, we process your personal data based on the following legal grounds:

<ul>
<li><strong>Contractual Necessity:</strong> Processing is required to fulfill our contractual obligations to you, including delivering enrolled courses and maintaining your account.</li>
<li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests in improving the platform, preventing fraud, and analyzing usage data, provided these interests are not overridden by your rights.</li>
<li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities, such as receiving marketing communications or using non-essential cookies.</li>
<li><strong>Legal Obligation:</strong> Processing is required to comply with applicable laws, tax regulations, or court orders.</li>
</ul>

You may withdraw your consent at any time without affecting the lawfulness of processing conducted prior to withdrawal.`,
        },
        {
          title: "5. Cookies and Tracking Technologies",
          content: `We use cookies and similar technologies to enhance your experience on our platform:

<ul>
<li><strong>Essential Cookies:</strong> Required for core platform functionality such as session management, authentication, and security. These cannot be disabled.</li>
<li><strong>Functional Cookies:</strong> Remember your preferences, language settings, and display options to provide a personalized experience.</li>
<li><strong>Analytics Cookies:</strong> Help us understand how users interact with the platform, which pages are most visited, and where users encounter difficulties.</li>
<li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns across third-party platforms.</li>
</ul>

You can manage your cookie preferences through your browser settings or our cookie consent banner. Disabling certain cookies may limit your ability to use some platform features.`,
        },
        {
          title: "6. Third-Party Services",
          content: `We integrate with various third-party services to provide enhanced functionality:

<ul>
<li><strong>Payment Processors:</strong> We use Stripe and bKash to securely process payments. These providers have their own privacy policies governing the handling of your financial information.</li>
<li><strong>Analytics Providers:</strong> We use Google Analytics and Mixpanel to analyze platform usage. These services collect anonymized data about your interactions with our platform.</li>
<li><strong>Communication Tools:</strong> We use SendGrid for email delivery and Intercom for in-platform messaging and customer support.</li>
<li><strong>Video Hosting:</strong> Course videos may be hosted on third-party platforms such as Vimeo or AWS CloudFront, which collect usage data independently.</li>
<li><strong>Cloud Infrastructure:</strong> Our platform is hosted on Amazon Web Services (AWS), which provides data storage and processing services subject to their own security and privacy standards.</li>
</ul>

We carefully vet our third-party partners and require them to maintain appropriate data protection measures.`,
        },
        {
          title: "7. Data Sharing and Disclosure",
          content: `We do not sell your personal information to third parties. We may share your data in the following limited circumstances:

<ul>
<li><strong>With Course Instructors:</strong> Instructors receive anonymized or aggregated learning data, quiz results, and assignment submissions for the courses you are enrolled in to facilitate instruction.</li>
<li><strong>With Service Providers:</strong> We share data with trusted vendors who perform services on our behalf, such as payment processing, email delivery, and cloud hosting, under strict contractual obligations.</li>
<li><strong>For Legal Reasons:</strong> We may disclose your information if required by law, court order, or governmental authority, or to protect the rights, property, or safety of KKIT, our users, or the public.</li>
<li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal data may be transferred to the successor entity, subject to the same privacy protections.</li>
<li><strong>With Your Consent:</strong> We may share your data with third parties when you have explicitly authorized us to do so.</li>
</ul>`,
        },
        {
          title: "8. International Data Transfers",
          content: `Your personal data may be transferred to and processed in countries other than your country of residence. We ensure that international transfers of personal data are protected by appropriate safeguards:

<ul>
<li>We rely on Standard Contractual Clauses (SCCs) approved by the European Commission for transfers outside the European Economic Area (EEA).</li>
<li>We ensure that recipients in third countries are subject to data protection obligations substantially equivalent to those in your jurisdiction.</li>
<li>Our cloud infrastructure providers maintain data centers in multiple regions, and we strive to store data in the region closest to our users where feasible.</li>
</ul>

By using our platform, you acknowledge that your data may be transferred across international borders, subject to the safeguards described in this policy.`,
        },
        {
          title: "9. Data Retention",
          content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:

<ul>
<li><strong>Account Data:</strong> Retained for the duration of your active account and for up to 3 years after account deletion to comply with legal obligations and dispute resolution.</li>
<li><strong>Course Progress and Completion Records:</strong> Retained indefinitely to allow you to access certificates and course materials, unless you request deletion.</li>
<li><strong>Payment Records:</strong> Retained for 7 years to comply with tax and financial regulations.</li>
<li><strong>Technical Logs:</strong> Retained for up to 12 months for security monitoring and debugging purposes.</li>
<li><strong>Marketing Preferences:</strong> Retained until you withdraw your consent or unsubscribe from communications.</li>
</ul>

When data is no longer required, we securely delete or anonymize it using industry-standard methods.`,
        },
        {
          title: "10. Data Security Measures",
          content: `We implement comprehensive technical and organizational measures to protect your personal data:

<ul>
<li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256 encryption.</li>
<li><strong>Access Controls:</strong> We enforce strict role-based access controls, multi-factor authentication for administrative access, and the principle of least privilege for all employees.</li>
<li><strong>Infrastructure Security:</strong> Our cloud infrastructure includes firewalls, intrusion detection systems, DDoS protection, and continuous security monitoring.</li>
<li><strong>Regular Audits:</strong> We conduct periodic security assessments, penetration testing, and vulnerability scans to identify and address potential threats.</li>
<li><strong>Employee Training:</strong> All employees with access to personal data receive regular training on data protection practices and security protocols.</li>
<li><strong>Incident Response:</strong> We maintain a comprehensive incident response plan and will notify affected users within 72 hours of discovering a data breach as required by applicable law.</li>
</ul>`,
        },
        {
          title: "11. Your Privacy Rights",
          content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:

<ul>
<li><strong>Right of Access:</strong> You may request a copy of the personal data we hold about you, provided in a structured, commonly used, and machine-readable format.</li>
<li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete personal data.</li>
<li><strong>Right to Erasure:</strong> You may request deletion of your personal data where there is no compelling reason for its continued processing.</li>
<li><strong>Right to Restrict Processing:</strong> You may request that we limit the processing of your data in certain circumstances.</li>
<li><strong>Right to Data Portability:</strong> You may request your data in a portable format that can be transferred to another service provider.</li>
<li><strong>Right to Object:</strong> You may object to processing based on legitimate interests, including direct marketing.</li>
<li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time.</li>
</ul>

To exercise any of these rights, please contact us at privacy@kkitbd.com. We will respond to your request within 30 days.`,
        },
        {
          title: "12. Account Deletion and Data Removal",
          content: `You have the right to delete your KKIT account and request removal of your personal data:

<ul>
<li>You can initiate account deletion from your <strong>Account Settings</strong> page. Upon deletion, your profile, course progress, and associated data will be permanently removed within 30 days.</li>
<li>Certain data may be retained in anonymized form for analytics purposes or as required by law (e.g., payment records for tax compliance).</li>
<li>If you are enrolled in active courses at the time of deletion, your access will be revoked and no refund will be provided for remaining course duration unless required by applicable consumer protection laws.</li>
<li>Instructors who delete their accounts will have their courses delisted. Published course content previously accessed by students will remain available in anonymized form.</li>
<li>We may delay deletion requests if we are legally required to retain the data, are investigating a potential security incident, or if the account is subject to an unresolved dispute.</li>
</ul>`,
        },
        {
          title: "13. Children's Privacy",
          content: `KKIT is not intended for use by children under the age of 16. We take children's privacy seriously and implement strict safeguards:

<ul>
<li>We do not knowingly collect personal information from children under 16 without verified parental or guardian consent.</li>
<li>If we discover that we have collected data from a child under 16 without appropriate consent, we will promptly delete that information from our records.</li>
<li>Parents and guardians may contact us at privacy@kkitbd.com to request review, correction, or deletion of any personal data collected from their child.</li>
<li>For users between the ages of 16 and 18, we recommend that a parent or guardian review this Privacy Policy and supervise the minor's use of the platform.</li>
</ul>

If you believe that a child has provided us with personal information without proper consent, please contact us immediately.`,
        },
        {
          title: "14. Changes to This Policy",
          content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors:

<ul>
<li>When we make material changes to this policy, we will notify you via email and through a prominent notice on our platform at least 30 days before the changes take effect.</li>
<li>Minor or non-material changes may be posted on this page without individual notification. The "Last Updated" date at the top of this policy indicates when it was last revised.</li>
<li>We encourage you to review this policy periodically to stay informed about how we protect your data.</li>
<li>Your continued use of the platform after the effective date of any changes constitutes your acceptance of the revised policy.</li>
<li>If you do not agree with the revised policy, you may close your account before the changes take effect.</li>
</ul>`,
        },
        {
          title: "15. Email Communications",
          content: `We use email as a primary channel for communicating with our users:

<ul>
<li><strong>Transactional Emails:</strong> We send essential emails related to your account, course enrollment confirmations, payment receipts, and security alerts. These emails are necessary for the functioning of the service and cannot be opted out of individually.</li>
<li><strong>Marketing Emails:</strong> We may send newsletters, course recommendations, promotional offers, and platform updates. You can unsubscribe from marketing emails at any time using the unsubscribe link in the email or through your account settings.</li>
<li><strong>Course Notifications:</strong> We send reminders about upcoming deadlines, new content in enrolled courses, and instructor announcements relevant to your learning activities.</li>
</ul>

We use third-party email service providers to deliver communications. These providers may collect information about email interactions (such as open rates and click-through rates) to help us improve the relevance and quality of our communications.`,
        },
        {
          title: "16. Payment Information Security",
          content: `We take the security of your financial information extremely seriously:

<ul>
<li>We do not store your full credit card number, CVV, or bank account details on our servers. All payment processing is handled by PCI DSS Level 1 compliant third-party payment processors.</li>
<li>When you make a purchase, your payment information is transmitted directly to the payment processor over a secure, encrypted connection. We receive only a token reference and the last four digits of your payment method.</li>
<li>All payment transactions are logged with anonymized reference identifiers for record-keeping and dispute resolution purposes.</li>
<li>We implement additional fraud detection measures, including velocity checks and transaction monitoring, to protect you and our platform from unauthorized transactions.</li>
</ul>

If you suspect unauthorized use of your payment method, please contact us immediately at support@kkitbd.com and your financial institution.`,
        },
        {
          title: "17. Social Media Features",
          content: `Our platform includes social media features that allow you to interact with us on third-party platforms:

<ul>
<li><strong>Social Login:</strong> You may register or sign in using your Google, Facebook, or GitHub account. When you use these features, the social provider shares your basic profile information (name, email, profile picture) with us in accordance with their privacy settings.</li>
<li><strong>Sharing Features:</strong> You can share course progress, achievements, and certificates on social media platforms. These features may collect your IP address and the page you are visiting.</li>
<li><strong>Social Plugins:</strong> Embedded "like" and "share" buttons on our platform may track your browsing activity across websites, even if you do not interact with them.</li>
</ul>

The data collected by social media features is governed by the respective platform's privacy policy. We recommend reviewing the privacy settings on your social media accounts to understand what data is shared with third parties.`,
        },
        {
          title: "18. Contact Our Privacy Team",
          content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:

<ul>
<li><strong>Email:</strong> privacy@kkitbd.com</li>
<li><strong>Mailing Address:</strong> KKIT Privacy Team, 123 Tech Avenue, Dhaka 1212, Bangladesh</li>
<li><strong>Data Protection Officer:</strong> dpo@kkitbd.com</li>
<li><strong>Phone:</strong> +880 1XXX-XXXXXX (Monday to Friday, 9:00 AM – 6:00 PM BST)</li>
</ul>

If you are not satisfied with our response, you have the right to lodge a complaint with the relevant supervisory authority in your jurisdiction. We are committed to resolving any privacy concerns promptly and transparently. For urgent security matters, please contact security@kkitbd.com.`,
        },
      ]}
    />
  );
}
