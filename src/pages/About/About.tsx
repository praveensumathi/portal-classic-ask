import { WhatsApp } from "@mui/icons-material";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";

function About() {
  const AboutUsData = [
    {
      title: "Contact Us:",
      content: (
        <>
          <Typography variant="body2">
            {import.meta.env.VITE_SHOP_NAME}
            <br />
            Classic Style Payans Men's Wear Near Clock Tower,
            <br />
            NAMAKKAL – 637001
            <br />
            <br />
            Email: {import.meta.env.VITE_SHOP_MAIL}
            <br />
            Contact for any other Inquiries: +91 9994698600
            <br />
            <br />
            <NavLink to={import.meta.env.VITE_C_ASK_WHATSAPP} target="_blank">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#25D366",
                  marginTop: "4px",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#1A9533",
                  },
                }}
                startIcon={<WhatsApp fontSize="large" />}
              >
                Chat Now
              </Button>
            </NavLink>
          </Typography>
        </>
      ),
    },
    {
      title: "Privacy Policy:",
      content: (
        <>
          <Typography variant="body2">
            SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
            <br />
            <br />
            When you purchase something from our store, as part of the buying
            and selling process, we collect the personal information you give us
            such as your name, address and email address. When you browse our
            store, we also automatically receive your computer’s internet
            protocol (IP) address in order to provide us with information that
            helps us learn about your browser and operating system. Email
            marketing (if applicable): With your permission, we may send you
            emails about our store, new products and other updates.
            <br />
            <br />
            SECTION 2 - DISCLOSURE
            <br />
            <br />
            We may disclose your personal information if we are required by law
            to do so or if you violate our Terms of Service.
            <br />
            <br />
            SECTION 3 – PAYMENT
            <br />
            <br />
            We use Phonepe for processing payments. We/Phonepe do not store your
            card data on their servers. The data is encrypted through the
            Payment Card Industry Data Security Standard (PCI-DSS) when
            processing payment. Your purchase transaction data is only used as
            long as is necessary to complete your purchase transaction. After
            that is complete, your purchase transaction information is not
            saved.
            <br />
            <br />
            SECTION 4 – SECURITY
            <br />
            <br />
            To protect your personal information, we take reasonable precautions
            and follow industry best practices to make sure it is not
            inappropriately lost, misused, accessed, disclosed, altered or
            destroyed.
            <br />
            <br />
            SECTION 5 – COOKIES
            <br />
            <br />
            We use cookies to maintain session of your user. It is not used to
            personally identify you on other websites.
            <br />
            <br />
            QUESTIONS AND CONTACT INFORMATION
            <br />
            <br />
            If you would like to: access, correct, amend or delete any personal
            information we have about you, register a complaint, or simply want
            more information contact us +91 {import.meta.env.VITE_SHOP_PHONE1}
          </Typography>
        </>
      ),
    },
    {
      title: "Terms and Conditions",
      content: (
        <>
          <Typography variant="body2">
            SECTION 1 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
            <br />
            <br />
            We do not guarantee, represent or warrant that your use of our
            service will be uninterrupted, timely, secure or error-free. We do
            not warrant that the results that may be obtained from the use of
            the service will be accurate or reliable. You agree that from time
            to time we may remove the service for indefinite periods of time or
            cancel the service at any time, without notice to you.
            <br />
            <br />
            You expressly agree that your use of, or inability to use, the
            service is at your sole risk. The service and all products and
            services delivered to you through the service are (except as
            expressly stated by us) provided ‘as is’ and ‘as available’ for your
            use, without any representation, warranties or conditions of any
            kind, either express or implied, including all implied warranties or
            conditions of merchantability, merchantable quality, fitness for a
            particular purpose, durability, title, and non infringement.
            <br />
            <br />
            In no case shall {import.meta.env.VITE_SHOP_NAME} Collections ,our
            officers, employees, affiliates, agents, contractors, interns,
            suppliers, service providers or licensors be liable for any injury,
            loss, claim, or any direct, indirect, incidental, punitive, special,
            or consequential damages of any kind, including, without limitation
            lost profits, lost revenue, lost savings, loss of data, replacement
            costs, or any similar damages, whether based in contract, tort
            (including negligence), strict liability or otherwise, arising from
            your use of any of the service or any products procured using the
            service, or for any other claim related in any way to your use of
            the service or any product, including, but not limited to, any
            errors or omissions in any content, or any loss or damage of any
            kind incurred as a result of the use of the service or any content
            (or product) posted, transmitted, or otherwise made available via
            the service, even if advised of their possibility. Because some
            states or jurisdictions do not allow the exclusion or the limitation
            of liability for consequential or incidental damages, in such states
            or jurisdictions, our liability shall be limited to the maximum
            extent permitted by law.
            <br />
            <br />
            SECTION 2 - USER RESTRICTIONS
            <br />
            <br />
            User must be at least 18 years old to register and use this
            platform.User may only use this platform in geographic regions where
            we offer our services. Creating and maintaining multiple accounts to
            circumvent platform rules or engage in fraudulent activities is
            strictly prohibited.Engaging in any form of fraudulent activity,
            including but not limited to using stolen credit cards, identity
            theft, or scams, is not allowed.
            <br />
            <br />
            Providing false or misleading information, whether in your personal
            details or product descriptions, is prohibited.Harassment, hate
            speech, or any form of abusive communication between users is
            strictly forbidden. Unauthorized access to others' accounts or our
            platform's systems is not allowed.Engaging in payment fraud,
            including chargebacks or fraudulent payment disputes, is prohibited.
            <br />
            <br />
            Posting or sharing inappropriate or offensive content, such as hate
            speech, adult content, or any content that violates community
            guidelines, is not permitted.Automated scraping or collecting data
            from our platform without permission is strictly prohibited.Sending
            mass or unsolicited messages to other users, which can be considered
            spam, is not allowed.Violating these restrictions may result in
            account suspension or termination, as well as legal action when
            applicable.
            <br />
            <br />
            SECTION 3 - RULES OF CONDUCT
            <br />
            <br />
            Treat all users, including sellers and customers, with respect and
            courtesy. Refrain from engaging in any form of harassment, hate
            speech, or abusive behavior.Provide accurate and complete
            information when registering an account or creating product
            listings. Avoid posting false or misleading information, including
            product descriptions and pricing.Engage in honest and transparent
            business practices. Do not manipulate reviews or rankings to gain an
            unfair advantage.Respect the privacy and data security of other
            users. Do not share data collection.Do not infringe on the
            intellectual property rights of others. This includes avoiding
            copyright, trademark, and patent violations.
            <br />
            <br />
            Make prompt and accurate payments for products and services. Refrain
            from chargebacks or fraudulent payment disputes.Protect your account
            and personal information. Keep your login credentials confidential.
            Report any unauthorized access or suspicious activities promptly.
            Provide constructive feedback to help us improve our platform. Share
            your suggestions and concerns with us through the designated
            channels.Violating these rules of conduct may result in account
            suspension, termination, or other actions necessary to uphold the
            integrity of our platform and protect our users.
            <br />
            <br />
            SECTION 4 - TERMS AND MODIFICATIONS TO THIS PRIVACY POLICY
            <br />
            <br />
            Our Privacy Policy is subject to change at any time without notice.
            To make sure you are aware of any changes, please review this policy
            periodically. These changes will be effective immediately on the
            Users of {import.meta.env.VITE_SHOP_NAME}. Please note that at all
            times you are responsible for updating your Personal Information,
            including to provide us with your most current contact details (i.e
            address, mail Id, contact number, etc.,)
            <br />
            <br />
            If you do not wish to permit changes in our use of your Personal
            Information, you must notify us promptly that you wish to deactivate
            your account with us. Continued use of services after any change/
            amendment to this Privacy Policy shall indicate your acknowledgement
            of such changes and agreement to be bound by the terms and
            conditions of such changes.
            <br />
            <br />
            SECTION 5 - GOVERNING LAW
            <br />
            <br />
            Your use of this Website will be governed by and construed in
            accordance with the laws of India. The Users agree that any legal
            action or proceedings arising out of your use may be brought
            exclusively in the competent courts/ tribunals having jurisdiction
            in Tamil Nadu in India and irrevocably submit themselves to the
            jurisdiction of such courts/ tribunals.
          </Typography>
        </>
      ),
    },
    {
      title: "Shipping Policy:",
      content: (
        <>
          <Typography variant="body2">
            The charges for shipping products shopped at our website depends on
            the location to which you want your purchases to be shipped. The
            purchased products from our site will be shipped to the address
            provided by you in our website. Please ensure to verify the address
            entered by you before confirming your order to avoid incorrect
            delivery.
            <br />
            <br />
            Time Frame – We will always strive to deliver your products as per
            your schedule; however, all products might not reach at the
            designated time. The delivery of your product is based on the
            location. You can expect to receive your booked orders within 5-7
            working days. Apart from Sundays, there are certain holidays
            throughout the year that are not considered as business days.
            Deliveries will not happen on these days. Please contact us through
            WhatsApp +91 {import.meta.env.VITE_SHOP_PHONE1}, if your parcel not
            delivered within the given timeline.
            <br />
            <br />
            Charges – We utilize the services of reputed courier service
            providers for offering shipping in India. Shipping charges are borne
            by the customers. Shipping costs are based on weight and are
            calculated at the time of selecting the item. To reflect the
            policies of the courier companies we use, all weights will be
            rounded up to the next full kg. If you wish to proceed with further
            purchase you may place a new order.
            <br />
            <br />
            Dispatch and Tracking – We try our best to ship goods to you as soon
            as possible. On an average, it takes us about 48 hours to ship goods
            out of our warehouse and update you the tracking details. You can
            check the tracking details in your order page after 48 hours of
            placing orders. Please make sure your parcel is on track by tracking
            it in courier website.
            <br />
            <br />
            In the event of a problem in processing your order, we will notify
            you via WhatsApp/call requesting further information.
          </Typography>
        </>
      ),
    },
    {
      title: "Return/Exchange & Refund Policy:",
      content: (
        <>
          <Typography variant="body2">
            Return or Exchange accepted only for Damaged, Wrong product, Wrong
            size received from us. [No other reasons are accepted] Parcel
            opening video is mandatory for reporting any of these
            above-mentioned issues.
            <br />
            <br />
            First step to report any issue (whether its wrong size delivered,
            damage, stain, wrong or incomplete product) Share complete
            360-degree angle unboxing video within 24 hrs of delivery
            <br />
            <br />
            <b>How to make the right unboxing video?</b>
            <br />
            <br />
            - &nbsp; &nbsp; Show 360-degree view of the parcel to know it's
            completely sealed and not open from any side. All sides of the
            parcel should be clear in video that it's sealed pack.
            <br />
            <br />- &nbsp; &nbsp; Then show the address (to and from) and
            tracking number mentioned on the parcel
            <br />
            <br />- &nbsp; &nbsp;Then open it by hand only (don't use scissors
            or sharp object, if any cut or damage by scissors or knife it will
            not replace).
            <br />
            <br />- &nbsp; &nbsp;Till you don't check products having any
            damage, stain, Missing item or any issue don't pause, cut or stop
            the video. If you find any issue it should be clearly visible in
            video itself and point out the issue in video.
            <br />
            <br />
            Report us if you have issues within 24 hrs of delivery, if you
            report after given time it will not accept for replacement or
            exchange.
            <br />
            <br />
            If you receive opened or damaged parcel from delivery boy, please do
            not accept the parcel. Let the delivery person take a parcel return
            at the same time. If you accept any light weight (0.50gms to
            100grms) or damaged or opened or half damaged parcel, we will not be
            responsible for replacement.
            <br />
            <br />
            You can call our Support Number or Whatsapp{" "}
            {import.meta.env.VITE_SHOP_PHONE1} or Email Us at &nbsp;
            <a
              href={`mailto:${import.meta.env.VITE_SHOP_MAIL}`}
              target="_blank"
            >
              {import.meta.env.VITE_SHOP_MAIL}
            </a>
            &nbsp; for any of the above-mentioned reasons of return.
            <br />
            <br />
            Please share the details Order number, courier docket No or AWB No,
            Reason for Return or Issue and parcel opening video.
            <br />
            <br />
            <b>Notes:</b>
            <br />
            <br />
            Handloom fabric like Khaadi, silk are handmade fabric in which
            slightly thread coming out or extra thread will not consider damage
            as its handmade handloom fabric
            <br />
            <br />
            Any removable slight stain like dust, machine oil over fabric or
            glue which can be removed at home by wash will not consider for
            replacement
            <br />
            <br />
            No complaint will be entertained without a proper unboxing video.
            Kindly adheres policy for smooth and healthy business
            <br />
            <br />
            <b>
              Rules guidelines to make business smooth to get Hassel free
              solutions.
            </b>
            <br />
            <br />- &nbsp; &nbsp; Products cannot be returned after completion
            of the payment. Payment Refunds are applicable only in case of
            damaged products or delivery of incorrect size (size other than that
            ordered). Returns and Replacements are done free of cost if wrong
            products (incomplete sets or incorrect style), wrong sizes (size
            other than that ordered) or damaged products are received by the
            customer. Premium quality are used to ensure the best fashion
            experience, however colour bleeding might happen for some apparels
            due to washing and drying conditions.
            <br />
            <br />
            <b>Guidelines for a valid return:</b>
            <br />
            Product & Accessories, if any, should be in original condition Tags
            should be retained and returned Returns and Replacements are done
            free of cost if wrong products (incomplete sets or incorrect style),
            wrong sizes (size other than that ordered) or damaged products are
            received by the customer.
            <br />
            <br />
            <b>Cancellation Policy</b>
            <br />
            Orders once placed cannot be cancelled.
            <br />
            <br />
            <b>Refund Policy</b>
            <br />
            Your refund will be initiated by us within 5 business days of
            receiving the refund request and authorization of the refund. Your
            refund is estimated to be credited in the account, used for order
            payment, between 4-8 days after initiating the refund. Please note
            that the timing of the actual account credit is dependent on
            multiple external agencies such as banks, payment gateways and
            external couriers (for cheques).
            <br />
            <br />
            <b>Mode of Refund</b>
            <br />
            For returned products (due to incomplete sets, incorrect style,
            wrong sizes, or defective products delivered), the refund amount
            will be credited back into the same account (online banking, credit
            card, debit card) that was used to make the purchase.
          </Typography>
        </>
      ),
    },
  ];

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
          Terms & Support
        </Typography>
        <List sx={{ textAlign: "left", padding: 0 }}>
          {AboutUsData &&
            AboutUsData.length > 0 &&
            AboutUsData.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <>
                      <div>
                        <b>{`${index + 1}. ${item.title}`}</b>
                      </div>
                      <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        (Last updated on Dec 20th 2025)
                      </Typography>
                    </>
                  }
                  secondary={item.content}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{
                    color: "#333",
                    pl: 2,
                    marginTop: "8px",
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Container>
    </>
  );
}

export default About;
