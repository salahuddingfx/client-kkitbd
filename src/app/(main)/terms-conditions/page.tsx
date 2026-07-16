"use client";

import { PolicyPage } from "@/components/common";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      lastUpdated="January 15, 2025"
      breadcrumbLabel="Terms & Conditions"
      intro="Welcome to KKIT. These Terms and Conditions govern your use of our online learning platform, including all courses, resources, and services provided through kkitbd.com. By accessing or using our platform, you agree to be bound by these terms."
      items={[
        {
          title: "1. Acceptance of Terms",
          content: `By creating an account, enrolling in courses, or otherwise accessing or using the KKIT platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you must not use our platform.

These terms constitute a legally binding agreement between you and KKIT. We reserve the right to update these terms at any time, and your continued use of the platform after changes are posted constitutes acceptance of the revised terms. Material changes will be communicated via email or a prominent notice on the platform at least 15 days before they take effect.`,
        },
        {
          title: "2. Eligibility",
          content: `To use the KKIT platform, you must meet the following eligibility requirements:

<ul>
<li>You must be at least 16 years of age. Users between the ages of 16 and 18 must have a parent or guardian's permission to use the platform.</li>
<li>You must have the legal capacity to enter into binding agreements in your jurisdiction.</li>
<li>You must not be barred from receiving services under the laws of Bangladesh or any other applicable jurisdiction.</li>
<li>You must provide accurate, current, and complete registration information.</li>
<li>You must maintain and promptly update your information to keep it accurate and complete.</li>
</ul>

By registering, you represent and warrant that you meet all eligibility requirements and that the information you provide is truthful and accurate.`,
        },
        {
          title: "3. User Accounts and Registration",
          content: `When you create an account on KKIT, you agree to the following:

<ul>
<li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
<li>You must notify us immediately at support@kkitbd.com if you suspect unauthorized access to your account.</li>
<li>You may not share your account credentials with any third party or allow multiple individuals to access a single account.</li>
<li>You may not create more than one account per person. Duplicate accounts may be terminated without notice.</li>
<li>We reserve the right to suspend or terminate accounts that we reasonably believe are being used by unauthorized persons or for fraudulent purposes.</li>
<li>Account sharing, credential selling, or access redistribution is strictly prohibited and may result in permanent account termination without refund.</li>
</ul>

You are solely responsible for all activity that occurs under your account, including any purchases and course enrollments.`,
        },
        {
          title: "4. Course Enrollment and Access",
          content: `Course enrollment on KKIT is subject to the following terms:

<ul>
<li><strong>Enrollment:</strong> Enrolling in a course grants you a limited, non-exclusive, non-transferable license to access the course content for personal, educational use.</li>
<li><strong>Access Duration:</strong> Unless otherwise specified at the time of purchase, you receive lifetime access to enrolled courses, subject to the continued availability of the platform and the course content.</li>
<li><strong>Content Access:</strong> Course content is delivered through streaming video, downloadable materials, and interactive exercises. Some content may be available for offline access through our mobile application.</li>
<li><strong>Course Changes:</strong> Instructors may update, modify, or remove course content at any time. We will notify enrolled students of material content changes when feasible.</li>
<li><strong>Restrictions:</strong> You may not download, reproduce, redistribute, or share course content with unauthorized persons. Screen recording and screen capture of course videos is prohibited.</li>
<li><strong>Prerequisites:</strong> Some courses have prerequisites. It is your responsibility to verify that you meet course requirements before enrolling.</li>
</ul>`,
        },
        {
          title: "5. Pricing and Payment",
          content: `All pricing and payment terms for courses and services are as follows:

<ul>
<li><strong>Currency:</strong> All prices are listed in Bangladeshi Taka (BDT) unless otherwise specified. International users may be charged in their local currency through the payment processor's conversion rates.</li>
<li><strong>Payment Methods:</strong> We accept payments via bKash, Nagad, credit and debit cards (Visa, Mastercard), and other methods as displayed at checkout.</li>
<li><strong>Payment Processing:</strong> All transactions are processed through PCI DSS Level 1 compliant payment processors. We do not store your full payment card details.</li>
<li><strong>Taxes:</strong> Prices may include applicable taxes based on your jurisdiction. Any additional taxes, duties, or fees imposed by your local government are your responsibility.</li>
<li><strong>Promotional Pricing:</strong> Discounted or promotional prices are valid only during the stated promotional period and cannot be applied retroactively to previous purchases.</li>
<li><strong>Installment Plans:</strong> Where available, installment plans require full payment within the stated period. Failure to complete installment payments may result in course access suspension.</li>
</ul>`,
        },
        {
          title: "6. Refund Policy Summary",
          content: `We offer refunds under the following conditions:

<ul>
<li><strong>14-Day Refund Window:</strong> You may request a full refund within 14 days of your original purchase, provided you have completed no more than 30% of the course content.</li>
<li><strong>Eligibility:</strong> Refund requests must be submitted through your account dashboard or by contacting support@kkitbd.com. Refund eligibility is determined based on course content access logs.</li>
<li><strong>Non-Refundable Items:</strong> The following are not eligible for refund: bundled course packages after individual courses have been accessed, courses purchased with promotional codes designated as final sale, and mentorship or coaching services after the first session has occurred.</li>
<li><strong>Processing Time:</strong> Approved refunds are processed within 5–10 business days to the original payment method. Bank processing times may vary.</li>
<li><strong>Chargebacks:</strong> If you initiate a chargeback or payment dispute without first contacting our support team, we may temporarily suspend your account pending resolution of the dispute.</li>
</ul>`,
        },
        {
          title: "7. Intellectual Property Rights",
          content: `All content on the KKIT platform is protected by intellectual property laws:

<ul>
<li><strong>Platform Content:</strong> All course materials, videos, text, graphics, logos, software, and other content on KKIT are owned by or licensed to KKIT and are protected by copyright, trademark, and other intellectual property laws.</li>
<li><strong>License Grant:</strong> KKIT grants you a limited, revocable, non-transferable license to access and use the platform and its content for personal, non-commercial educational purposes only.</li>
<li><strong>Instructor Content:</strong> Course content created by instructors remains the intellectual property of the respective instructors, subject to the licensing agreements they have entered into with KKIT.</li>
<li><strong>Restrictions:</strong> You may not copy, modify, distribute, sell, lease, reverse-engineer, or create derivative works from any content on the platform without prior written permission from KKIT or the content owner.</li>
<li><strong>Trademarks:</strong> The KKIT name, logo, and associated branding are trademarks of KKIT. You may not use our trademarks without prior written consent.</li>
</ul>`,
        },
        {
          title: "8. User-Generated Content",
          content: `When you submit, post, or upload content to the KKIT platform, you agree to the following:

<ul>
<li><strong>Ownership:</strong> You retain ownership of any original content you create and submit to the platform, including forum posts, assignments, and project submissions.</li>
<li><strong>License to KKIT:</strong> By submitting content, you grant KKIT a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content in connection with operating and promoting the platform.</li>
<li><strong>Content Standards:</strong> You agree not to submit content that is unlawful, defamatory, infringing, hateful, obscene, or otherwise objectionable. We reserve the right to remove any content that violates these standards without prior notice.</li>
<li><strong>Responsibility:</strong> You are solely responsible for the content you submit. KKIT does not endorse user-generated content and assumes no liability for submissions made by users.</li>
<li><strong>Feedback:</strong> Any suggestions, ideas, or feedback you provide regarding the platform may be used by KKIT without obligation or compensation to you.</li>
</ul>`,
        },
        {
          title: "9. Prohibited Conduct",
          content: `When using the KKIT platform, you must not engage in the following activities:

<ul>
<li><strong>Unauthorized Access:</strong> Attempting to access other users' accounts, private areas of the platform, or systems and networks connected to the platform without authorization.</li>
<li><strong>Content Theft:</strong> Downloading, copying, screen recording, or redistributing course content, whether for personal use or to share with others outside the platform.</li>
<li><strong>Automated Access:</strong> Using bots, scrapers, crawlers, or other automated tools to access or interact with the platform in ways that exceed normal usage patterns.</li>
<li><strong>Disruption:</strong> Interfering with or disrupting the platform, servers, or networks, or introducing malware, viruses, or other harmful code.</li>
<li><strong>Fraud:</strong> Providing false information, creating accounts under false identities, or engaging in fraudulent transactions.</li>
<li><strong>Commercial Exploitation:</strong> Using the platform for any unauthorized commercial purpose, including reselling course access or using course materials for commercial training without permission.</li>
<li><strong>Harassment:</strong> Engaging in abusive, threatening, or harassing behavior toward other users, instructors, or staff.</li>
</ul>

Violations may result in immediate account suspension or termination without notice and, where applicable, legal action.`,
        },
        {
          title: "10. Course Completion and Certificates",
          content: `KKIT issues certificates of completion under the following conditions:

<ul>
<li><strong>Completion Criteria:</strong> A certificate is issued upon completing all required modules, passing all mandatory assessments, and meeting the minimum score threshold specified by the instructor for a given course.</li>
<li><strong>Certificate Validity:</strong> Certificates issued by KKIT verify that you have completed a specific course and are not equivalent to academic degrees, professional certifications, or accreditation from educational institutions.</li>
<li><strong>Verification:</strong> Each certificate includes a unique verification URL that can be used by employers or institutions to confirm its authenticity.</li>
<li><strong>Revocation:</strong> KKIT reserves the right to revoke a certificate if it is determined that it was obtained through dishonest means, including plagiarism, cheating on assessments, or account sharing.</li>
<li><strong>Duplicates:</strong> You may download and re-download your certificates at any time from your account dashboard. We recommend keeping a local backup for your records.</li>
</ul>`,
        },
        {
          title: "11. Limitation of Liability",
          content: `To the maximum extent permitted by applicable law:

<ul>
<li>KKIT and its officers, directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform, even if we have been advised of the possibility of such damages.</li>
<li>Our total aggregate liability to you for all claims arising from or related to the platform shall not exceed the amount you paid to KKIT in the 12 months immediately preceding the event giving rise to the claim.</li>
<li>We are not liable for any loss of data, loss of profits, business interruption, or any other loss or damage that is not directly caused by our breach of these terms.</li>
<li>We are not responsible for the accuracy, reliability, or availability of third-party services integrated into the platform, including payment processors and hosting providers.</li>
<li>These limitations apply regardless of the legal theory (contract, tort, negligence, or otherwise) on which the claim is based.</li>
</ul>`,
        },
        {
          title: "12. Disclaimer of Warranties",
          content: `The KKIT platform and all content provided through it are offered on an "as is" and "as available" basis:

<ul>
<li>We make no warranties, expressed or implied, regarding the platform's uninterrupted availability, reliability, accuracy, or fitness for any particular purpose.</li>
<li>We do not guarantee that the platform will be free from errors, bugs, viruses, or other harmful components, although we implement industry-standard security measures to minimize such risks.</li>
<li>We do not warrant that course content will meet your specific requirements or that course completion will lead to employment, professional advancement, or any particular outcome.</li>
<li>The educational content on KKIT is provided for informational and educational purposes only and does not constitute professional advice. You should consult qualified professionals for specific guidance.</li>
<li>Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusions may not apply to you in full. Your statutory rights under applicable consumer protection laws are not affected.</li>
</ul>`,
        },
        {
          title: "13. Indemnification",
          content: `You agree to indemnify, defend, and hold harmless KKIT and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:

<ul>
<li>Your use of the platform or any services obtained through it.</li>
<li>Your violation of these Terms and Conditions or any applicable law or regulation.</li>
<li>Your violation of any third-party rights, including intellectual property rights, privacy rights, or publicity rights.</li>
<li>Any content you submit, post, or transmit through the platform.</li>
<li>Any disputes between you and other users of the platform.</li>
<li>Your negligent or willful misconduct in connection with the platform.</li>
</ul>

This indemnification obligation survives the termination of your account and your use of the platform. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter subject to indemnification by you.`,
        },
        {
          title: "14. Termination of Accounts",
          content: `We may suspend or terminate your account under the following circumstances:

<ul>
<li><strong>By You:</strong> You may close your account at any time through your account settings. Account closure does not entitle you to a refund of any amounts previously paid unless required by applicable law.</li>
<li><strong>By KKIT:</strong> We may suspend or terminate your account if you violate these Terms and Conditions, engage in prohibited conduct, or if we reasonably believe your account poses a security risk.</li>
<li><strong>Effect of Termination:</strong> Upon termination, your right to access the platform and its content ceases immediately. We may retain certain data as required by law or for legitimate business purposes, as described in our Privacy Policy.</li>
<li><strong>Outstanding Obligations:</strong> Termination does not relieve you of any outstanding payment obligations incurred prior to termination.</li>
<li><strong>Surviving Provisions:</strong> The following sections survive termination: Intellectual Property Rights, Limitation of Liability, Disclaimer of Warranties, Indemnification, Dispute Resolution, and Governing Law.</li>
</ul>`,
        },
        {
          title: "15. Dispute Resolution",
          content: `Any disputes arising from or related to these Terms and Conditions shall be resolved through the following process:

<ul>
<li><strong>Informal Resolution:</strong> Before initiating formal proceedings, you agree to first contact us at legal@kkitbd.com and attempt to resolve the dispute informally for a period of at least 30 days.</li>
<li><strong>Mediation:</strong> If informal resolution is unsuccessful, both parties agree to submit the dispute to mediation administered by a mutually agreed-upon mediator before initiating arbitration or litigation.</li>
<li><strong>Arbitration:</strong> If mediation fails to resolve the dispute, either party may submit the matter to binding arbitration in accordance with the rules of the Bangladesh Arbitration Act 2001. The arbitration shall be conducted in Dhaka, Bangladesh.</li>
<li><strong>Class Action Waiver:</strong> To the extent permitted by law, you agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.</li>
<li><strong>Exceptions:</strong> Notwithstanding the above, either party may seek injunctive or equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of intellectual property rights or breach of confidentiality obligations.</li>
</ul>`,
        },
        {
          title: "16. Governing Law",
          content: `These Terms and Conditions are governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law principles:

<ul>
<li>The courts of Dhaka, Bangladesh shall have exclusive jurisdiction over any disputes arising from or related to these terms, subject to the dispute resolution provisions outlined above.</li>
<li>If you are accessing the platform from outside Bangladesh, you are responsible for compliance with local laws applicable to your use of the platform. Nothing in these terms is intended to limit any rights you may have under the mandatory consumer protection laws of your jurisdiction.</li>
<li>In the event of a conflict between these terms and applicable local laws, the applicable local laws shall prevail to the extent of the conflict.</li>
<li>If any provision of these terms is found to be invalid or unenforceable under applicable law, the remaining provisions shall continue in full force and effect.</li>
</ul>`,
        },
        {
          title: "17. Modifications to Terms",
          content: `We reserve the right to modify these Terms and Conditions at any time to reflect changes in our business practices, legal requirements, or platform functionality:

<ul>
<li><strong>Material Changes:</strong> When we make material changes to these terms, we will notify you via email and through a prominent banner on the platform at least 15 days before the changes take effect.</li>
<li><strong>Minor Changes:</strong> Non-material changes may be posted on this page without individual notification. The "Last Updated" date at the top of this page indicates the most recent revision date.</li>
<li><strong>Acceptance:</strong> Your continued use of the platform after the effective date of any modifications constitutes your acceptance of the updated terms.</li>
<li><strong>Rejection:</strong> If you do not agree to the modified terms, you must stop using the platform and close your account before the changes take effect. Continued use after the effective date constitutes acceptance.</li>
<li><strong>Prior Terms:</strong> Previous versions of these terms will be made available upon request by contacting legal@kkitbd.com.</li>
</ul>`,
        },
        {
          title: "18. Contact Information",
          content: `If you have any questions, concerns, or feedback regarding these Terms and Conditions, please contact us through the following channels:

<ul>
<li><strong>General Inquiries:</strong> support@kkitbd.com</li>
<li><strong>Legal Department:</strong> legal@kkitbd.com</li>
<li><strong>Mailing Address:</strong> KKIT Legal Team, 123 Tech Avenue, Dhaka 1212, Bangladesh</li>
<li><strong>Phone:</strong> +880 1XXX-XXXXXX (Monday to Friday, 9:00 AM – 6:00 PM BST)</li>
<li><strong>Website:</strong> www.kkitbd.com</li>
</ul>

We aim to respond to all inquiries within 3–5 business days. For matters requiring urgent attention, such as security concerns or account compromise, please email support@kkitbd.com with the subject line marked as "URGENT."`,
        },
      ]}
    />
  );
}
