"use client";

import { PolicyPage } from "@/components/common";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      lastUpdated="January 1, 2024"
      breadcrumbLabel="Refund Policy"
      intro="At KKIT, we stand behind the quality of our courses and want you to be satisfied with your purchase. This refund policy outlines the terms and conditions under which you may request a refund for courses, subscriptions, and other services purchased on our platform."
      items={[
        {
          title: "Refund Eligibility",
          content:
            "To be eligible for a refund, your request must be submitted within 30 calendar days of your original purchase date. You must have completed less than 30% of the course content and not downloaded more than two supplementary resource files. Refund eligibility is assessed on a per-purchase basis, and each item in a multi-course order is evaluated individually against these criteria.",
        },
        {
          title: "30-Day Money-Back Guarantee",
          content:
            "KKIT offers a 30-day money-back guarantee on all individual course purchases. If you are not satisfied with a course for any reason, you may request a full refund within 30 days of purchase, provided you have not completed more than 30% of the course material. This guarantee is designed to give you the confidence to invest in your learning without risk.",
        },
        {
          title: "How to Request a Refund",
          content: (
            <>
              <p className="mb-3">
                To request a refund, follow these steps:
              </p>
              <ul>
                <li>
                  Log in to your KKIT account and navigate to <strong>My Purchases</strong> in
                  your dashboard.
                </li>
                <li>
                  Locate the course or subscription you wish to refund and click{" "}
                  <strong>Request Refund</strong>.
                </li>
                <li>
                  Complete the refund request form, including a brief reason for your request.
                </li>
                <li>
                  Submit the form. You will receive an email confirmation within 24 hours
                  acknowledging receipt of your request.
                </li>
              </ul>
              <p className="mt-3">
                Alternatively, you can contact our support team directly at{" "}
                <strong>support@kkitbd.com</strong> with your order number and reason for the
                refund.
              </p>
            </>
          ),
        },
        {
          title: "Refund Processing Time",
          content:
            "Once your refund request is approved, the refund will be processed to your original payment method within 5-10 business days. Depending on your bank or credit card provider, it may take an additional 3-5 business days for the refund to appear on your statement. You will receive an email notification when the refund has been processed, including any relevant transaction reference numbers.",
        },
        {
          title: "Partial Refunds",
          content:
            "In certain circumstances, KKIT may issue a partial refund rather than a full refund. Partial refunds may apply when you have completed between 30% and 60% of a course, when a course was purchased as part of a bundle and only one course is being refunded, or when a discount code or promotional pricing was applied at the time of purchase. The partial refund amount will be calculated based on the percentage of content consumed and the effective price paid.",
        },
        {
          title: "Subscription Refunds",
          content: (
            <>
              <p className="mb-3">
                KKIT subscription plans follow a specific refund structure:
              </p>
              <ul>
                <li>
                  <strong>Monthly Subscriptions:</strong> You may cancel at any time and your
                  access will continue until the end of the current billing period. No partial
                  refund is issued for the current month.
                </li>
                <li>
                  <strong>Annual Subscriptions:</strong> A full refund is available within the
                  first 30 days. After 30 days, you may cancel but no refund will be issued for
                  the remaining period. Your access continues until the annual term expires.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Course Bundle Refunds",
          content:
            "When you purchase a course bundle, individual courses within the bundle cannot be refunded separately during the first 30 days. After 30 days, if you have completed less than 30% of the total bundle content, you may request a refund for the entire bundle only. If a specific course within the bundle is retired or significantly altered, you may be eligible for a partial refund calculated on a pro-rata basis relative to the bundle price.",
        },
        {
          title: "Enterprise Training Refunds",
          content:
            "Refunds for enterprise training packages are governed by the terms of your organization's service agreement. Generally, enterprise refunds must be requested within 14 days of purchase or contract signing. Unused seat licenses may be eligible for a prorated refund if requested before the training period begins. Custom enterprise content and onboarding sessions are non-refundable once delivery has commenced. Please contact your enterprise account manager for specific refund processing.",
        },
        {
          title: "Non-Refundable Items",
          content: (
            <>
              <p className="mb-3">
                The following items and services are not eligible for refunds under any
                circumstances:
              </p>
              <ul>
                <li>Courses where more than 60% of the content has been completed.</li>
                <li>Certificates of completion that have already been issued.</li>
                <li>One-on-one mentoring sessions that have been scheduled and attended.</li>
                <li>Downloaded supplementary materials, templates, or project files.</li>
                <li>Exam fees or certification voucher purchases.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Refund Method",
          content:
            "All refunds are issued to the original payment method used at the time of purchase. We do not offer refunds via alternative payment methods, store credit, or bank transfers. If your original payment method is no longer available (e.g., an expired credit card), please contact our support team to arrange an alternative refund method. KKIT reserves the right to require identity verification before processing refunds to alternative methods.",
        },
        {
          title: "Duplicate Payment Refunds",
          content:
            "If you have been charged multiple times for the same course or subscription due to a technical error, contact our support team immediately at <strong>support@kkitbd.com</strong> with your order confirmation and bank statement showing the duplicate charges. Duplicate payment refunds are processed on a priority basis, typically within 3-5 business days. KKIT will also investigate the root cause to prevent future occurrences.",
        },
        {
          title: "Cancellation vs Refund",
          content:
            "Cancellation and refund are different actions on KKIT. Cancelling a subscription stops future billing but does not generate a refund for the current period. Requesting a refund applies to a specific purchase and may result in the revocation of course access. If you cancel your account entirely, any active subscriptions will be cancelled at the end of the billing cycle, but course purchases are subject to this refund policy rather than automatic cancellation.",
        },
        {
          title: "Refund Abuse Policy",
          content:
            "KKIT reserves the right to limit or deny refund requests that we determine to be abusive. Patterns of behavior such as repeatedly purchasing and refunding courses, enrolling in courses solely to access and download materials before requesting a refund, or using multiple accounts to circumvent refund limits will result in account review. Accounts flagged for refund abuse may have their purchasing privileges suspended and future refund requests subject to additional scrutiny.",
        },
        {
          title: "Promotional and Discounted Purchases",
          content:
            "Courses purchased during promotional sales, flash deals, or with coupon codes are eligible for refunds under the same terms as regular purchases. However, the refund amount will reflect the actual price paid after the discount was applied, not the original listed price. Free courses, trial enrollments, and courses obtained through referral programs are not eligible for refunds as no payment was made.",
        },
        {
          title: "Disputed Charges",
          content:
            "If you initiate a chargeback or payment dispute with your bank or credit card company instead of contacting KKIT support directly, we will pause any refund processing until the dispute is resolved. We strongly encourage you to reach out to us first, as most issues can be resolved quickly through our support team. Chargebacks that are found to be invalid may result in account suspension and recovery of any improperly refunded amounts.",
        },
        {
          title: "Contact Refund Support",
          content:
            "For all refund-related inquiries, our dedicated support team is available to assist you. Reach us at <strong>refunds@kkitbd.com</strong> or through the live chat feature on our platform during business hours (Sunday&ndash;Thursday, 9:00 AM&ndash;6:00 PM BST). Please include your order number, the email address used for purchase, and a description of your refund request. We aim to respond to all refund inquiries within 1 business day.",
        },
      ]}
    />
  );
}
