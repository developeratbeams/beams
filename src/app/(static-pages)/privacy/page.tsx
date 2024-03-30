import Link from "next/link";
import React from "react";
import "../styles.css";
export default function Privacy() {
  return (
    <div className="termsandconditions">
      <div className="innertermsandconditions">
        <h1 className="headingterms">We care about your privacy</h1>
        <p>
          At Beams, we take your privacy seriously and are committed to
          protecting your personal information. This Privacy Policy outlines
          what personal data we collect, why we collect it, and how we use it to
          provide you with the best possible experience on our platform.
        </p>
        <div>
          <h3>What information do we collect?</h3>
          <p>Beams may collect the following types of information from you:</p>
          <ul>
            <li>
              Contact information such as your name, email address, and phone
              number.
            </li>
            <li>
              Demographic information such as your age, gender, and location.
            </li>
            <li>
              Information about your use of Beams platform, including browsing
              history and the content you interact with.
            </li>
          </ul>
          <h3>Why We Collect Your Information?</h3>
          <p>The information we collect from you is used to:</p>
          <ul>
            <li>
              Provide you with the best possible user experience on Beams
              platform
            </li>
            <li>
              Customize the content and features we offer to better meet your
              needs
            </li>
            <li>
              Send you updates and promotions about Beams and its services.
            </li>
            <li>Improve our platform and develop new features</li>
          </ul>
          <h3>How We Use Your Information ?</h3>
          <p>
            Beams will never sell, rent, or share your personal information with
            third parties for their own marketing purposes. The information we
            collect will only be used for the purposes outlined in this Privacy
            Policy.
          </p>
          <h3>Security of Your Information</h3>
          <p>
            We take the security of your information seriously and use
            appropriate measures to protect it from unauthorized access,
            disclosure, alteration, or destruction. However, please keep in mind
            that no method of data storage or transmission is 100% secure.
          </p>
          <h3>What are your privacy rights?</h3>
          <p>
            Beams may update this Privacy Policy from time to time to reflect
            changes in our practices or regulations. If we make any material
            changes to this Privacy Policy, we will notify you by email or by
            displaying a prominent notice on Beams platform.
          </p>
          <h3>How can you contact us about this policy?</h3>
          <p>
            If you have any questions or concerns about Beams&apos;s Privacy
            Policy or the information we collect,{" "}
            <Link href="/contact">please contact us.</Link> We will be happy to
            assist you.
          </p>
        </div>
      </div>
    </div>
  );
}
