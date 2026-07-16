"use client";

import { PolicyPage } from "@/components/common";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping & Delivery Policy"
      lastUpdated="January 1, 2024"
      breadcrumbLabel="Shipping Policy"
      intro="KKIT is a fully digital online learning platform. All products, courses, and materials are delivered electronically. This policy outlines how digital content is delivered to you after purchase."
      items={[
        {
          title: "1. Digital Product Delivery",
          content:
            "All products offered on KKIT are digital in nature and delivered electronically through our platform. Upon successful completion of payment, you will receive immediate or near-immediate access to your purchased content. No physical goods are shipped as part of standard course enrollment. Delivery is considered complete once the digital product is accessible in your KKIT account dashboard.",
        },
        {
          title: "2. Course Access Activation",
          content:
            "Course access is activated automatically once your payment has been confirmed and processed by our payment gateway. In most cases, access is granted within minutes of a successful transaction. You will receive a confirmation email at your registered address with details of your enrollment and instructions for accessing the course. If activation is delayed beyond 30 minutes, please check your spam folder or contact our support team.",
        },
        {
          title: "3. Downloadable Materials",
          content:
            "Certain courses include downloadable resources such as lecture notes, source code, project files, and supplementary reading materials. These files become available for download immediately upon course enrollment and remain accessible for the duration of your access period. Downloaded materials are licensed for personal, non-commercial educational use only.",
        },
        {
          title: "4. Certificate Delivery",
          content:
            "Certificates of completion are generated electronically and made available in your KKIT profile dashboard upon successful completion of all required course modules and assessments. You may download your certificate as a high-resolution PDF file at any time during your account lifetime. Physical certificate printing and mailing services are not currently offered by KKIT.",
        },
        {
          title: "5. Delivery Timeframes",
          content:
            "Standard digital delivery for all KKIT courses and materials is instantaneous or occurs within a few minutes of payment confirmation. Under rare circumstances involving payment verification, high transaction volumes, or technical issues, delivery may take up to 24 hours. KKIT does not guarantee delivery within a specific number of minutes but commits to resolving all delivery issues within one business day.",
        },
        {
          title: "6. Technical Requirements",
          content:
            "Accessing KKIT courses requires a stable internet connection, a modern web browser, and a device meeting the minimum system specifications listed on our platform. Some advanced courses involving hands-on labs or coding environments may impose additional requirements such as a minimum RAM capacity, specific operating system, or updated browser version. Users are responsible for ensuring their device meets these requirements prior to purchase.",
        },
        {
          title: "7. Access Across Devices",
          content:
            "Your KKIT account and all purchased course content can be accessed from any internet-connected device, including desktop computers, laptops, tablets, and smartphones. Course progress is synchronized across devices in real time, allowing you to seamlessly switch between devices without losing your place. Streaming quality may be automatically adjusted based on your device capabilities and network bandwidth.",
        },
        {
          title: "8. Offline Access",
          content:
            "KKIT offers limited offline access to course materials through our dedicated mobile application for selected courses. Offline content must be downloaded in advance while connected to the internet and is subject to expiration based on your course access period. Not all course content, including interactive labs, live sessions, and certain video lectures, is available for offline viewing.",
        },
        {
          title: "9. Delivery Confirmation",
          content:
            "Upon successful delivery of your digital content, you will receive a delivery confirmation email containing your order summary, course details, and direct links to begin your learning journey. You can also verify delivery status by logging into your KKIT account and checking the My Courses section of your dashboard. All transaction records and delivery confirmations are stored securely in your account history.",
        },
        {
          title: "10. Failed Delivery Issues",
          content:
            "If you experience issues accessing your purchased content, please first attempt the following troubleshooting steps: clear your browser cache, log out and log back in, and verify your payment was successful. If the issue persists after these steps, contact our technical support team within 7 days of purchase with your order confirmation number. KKIT will investigate and resolve all legitimate delivery failures at no additional cost to you.",
        },
        {
          title: "11. Shipping of Physical Merchandise",
          content:
            "KKIT does not currently sell, ship, or deliver any physical merchandise as part of its standard course offerings. In the event that KKIT introduces physical products such as branded merchandise, textbooks, or equipment kits in the future, a separate shipping policy with applicable terms, costs, and delivery timelines will be published and made available to customers prior to any such purchase.",
        },
        {
          title: "12. International Access",
          content:
            "KKIT courses are accessible from virtually any country with an internet connection. There are no geographic restrictions on accessing digital course content, provided your local laws permit such use. However, certain payment methods or promotional offers may be limited to specific regions. Users are responsible for ensuring that their use of KKIT complies with all applicable local regulations.",
        },
        {
          title: "13. Platform Availability",
          content:
            "KKIT strives to maintain maximum platform availability for content delivery. Our target uptime is 99.9% measured on a monthly basis. Scheduled maintenance windows will be communicated in advance via email and platform notifications at least 48 hours prior to occurrence. Unscheduled downtime due to unforeseen technical failures will be addressed as an emergency priority by our infrastructure team.",
        },
        {
          title: "14. Service Maintenance Windows",
          content:
            "KKIT conducts periodic maintenance to ensure optimal platform performance, security, and reliability. Scheduled maintenance typically occurs during off-peak hours to minimize disruption to learners. During maintenance windows, content delivery may be temporarily interrupted, though all course progress and data will be preserved. Users will be notified in advance through the platform dashboard and email.",
        },
        {
          title: "15. Contact Support",
          content:
            "If you have any questions or concerns regarding the delivery of your digital content, please reach out to our dedicated support team. You can contact KKIT support via the in-platform help center, by emailing support@kkitbd.com, or by using the live chat feature available on our website. Our support team operates during standard business hours and aims to respond to all inquiries within 24 hours.",
        },
      ]}
    />
  );
}
