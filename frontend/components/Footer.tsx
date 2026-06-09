import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#5B5E66] text-white">

      <div className="max-w-[1600px] mx-auto px-12 py-16">

        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-20 items-start">

          {/* Indigenous Acknowledgement */}
          <div>
            <p className="italic text-lg leading-relaxed">
              In the spirit of truth and reconciliation,
              The City of Calgary acknowledges that we live,
              work, and play on the ancestral and traditional
              territories of the Blackfoot Confederacy,
              made up of the Siksika, Piikani, and Kainai
              First Nations; the Îethka Nakoda Wîcastabi
              First Nations; and the Tsuut’ina First Nation.
              The City of Calgary is also homeland to the
              Métis Nation Battle River Territory –
              Nose Hill Métis Region 5 & Elbow River District 6.
              We acknowledge and give gratitude to the many
              First Nations, Métis, and Inuit people who live
              here and call Calgary home.
            </p>
          </div>

          {/* Engagement Section */}
          <div>
            <p className="text-xl leading-relaxed">
              You see the results of decisions made by
              The City of Calgary every day. Get involved
              and provide your input on City projects and
              programs. Together we can build a better city.
            </p>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Contact Us
            </h3>

            <div className="space-y-4 text-lg">

              <p>
                📞 Phone: 403-268-2489
              </p>

              <p>
                ✉️ Email: wave@calgary.ca
              </p>

              <p>
                🌐 Website: www.calgary.ca
              </p>

            </div>

            <div className="flex gap-8 mt-10 text-4xl">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}
