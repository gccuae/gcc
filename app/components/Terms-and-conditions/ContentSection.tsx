import React from 'react';

const ContentSection = () => {
  return (
    <section className="py-57px ">
      <div className="container">

        {/* Intro paragraph (KEEP) */}
        <p className="mb-3 lg:mb-6 text-lg leading-[1.526315789473684] font-light text-para-color dark:text-white/80 transition-colors duration-300">
          Welcome to Gulf Contractors Company. By accessing or using our website,
          services, or products, you agree to comply with and be bound by the
          following terms and conditions. Please read them carefully.
        </p>

        {/* 1. General */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 xl:pb-[27px] text-black">
          1. General
        </h3>
        <p className="text-lg leading-[1.526315789473684] font-light text-para-color dark:text-white/80">
          1.1. The information provided on this website is for general purposes only and does not constitute professional advice.
        </p>
        <p className="text-lg leading-[1.526315789473684] font-light text-para-color dark:text-white/80 mb-6">
          1.2. Gulf Contractors Company reserves the right to update or modify these Terms and Conditions at any time without prior notice.
        </p>

        {/* 2. Use of Website */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          2. Use of Website
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          2.1. You agree to use the website for lawful purposes only.
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mb-6">
          2.2. You must not use the website in any way that could damage, disable, or impair its functionality or interfere with other users.
        </p>

        {/* 3. Intellectual Property */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          3. Intellectual Property
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          3.1. All content on this website, including text, images, graphics, and logos, is the property of Gulf Contractors Company or its licensors.
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mb-6">
          3.2. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
        </p>

        {/* 4. Services */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          4. Services
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          4.1. All services provided by Gulf Contractors Company are subject to availability and confirmation.
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mb-6">
          4.2. Service descriptions, images, and specifications are indicative and may change without notice.
        </p>

        {/* 5. Liability */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          5. Liability
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          5.1. Gulf Contractors Company shall not be liable for any direct, indirect, or consequential damages arising from the use of the website or services.
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mb-6">
          5.2. We make no warranties regarding the accuracy, reliability, or completeness of the content on this website.
        </p>

        {/* 6. Privacy */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          6. Privacy
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          6.1. Your use of the website is also governed by our Privacy Policy.
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mb-6">
          6.2. By using the website, you consent to the collection and use of information as described in our Privacy Policy.
        </p>

        {/* 7. Governing Law */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          7. Governing Law
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          7.1. These Terms and Conditions are governed by the laws of the Abu Dhabi, UAE.
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mb-6">
          7.2. Any disputes arising under these Terms shall be resolved in the competent courts of Abu Dhabi, UAE.
        </p>

        {/* 8. Contact Information */}
        <h3 className="text-xl 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 text-black">
          8. Contact Information
        </h3>
        <p className="text-lg font-light text-para-color dark:text-white/80">
          For any questions regarding these Terms and Conditions, please contact us:
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mt-2">
          Email:<a href="mailto:info@gcc.ae" className="hover:text-black">  info@gcc.ae<br /></a>
          Phone: <a href="tel:+97126267510" className="hover:text-black"> +971 2 626 7510</a>
        </p>
        <p className="text-lg font-light text-para-color dark:text-white/80 mt-2">
          Address: Gulf Contractors Company (GCC) LLC<br />
          Suite No. 023, Liberty Tower, Khalifa St., P.O. Box 45363<br />
          Abu Dhabi, UAE
        </p>

      </div>
    </section>
  );
};

export default ContentSection;
