export default function Footer() {
  return (
    <footer className="bg-[#555961] text-white mt-20">

      <div className="max-w-[1600px] mx-auto px-8 py-12">

        <div className="grid md:grid-cols-3 gap-12">

          <div>
            <p className="italic leading-relaxed">
              In the spirit of truth and reconciliation, The City of Calgary acknowledges that we live, work, and play on the ancestral and traditional territories of the Blackfoot Confederacy, made up of the Siksika, Piikani, and Kainai First Nations; the Îethka Nakoda Wîcastabi First Nations, comprised of the Chiniki, Bearspaw, and Goodstoney First Nations; and the Tsuut’ina First Nation. The city of Calgary is also homeland to the Métis Nation Battle River Territory – Nose Hill Métis Region 5 & Elbow River District 6. We acknowledge and give gratitude to the many First Nations, Métis, and Inuit people who live here and call Calgary home.
            </p>
          </div>

          <div>
            <p className="leading-relaxed">
              You see the results of decisions made by
              The City of Calgary every day. Get involved
              and provide your input on City projects and
              programs. Together we can build a better city.
            </p>
          </div>

          <div>
            <h3 className="text-2xl mb-4">
              Contact Us
            </h3>

            <div className="space-y-3">
              <p>
                📞 Phone: 403-268-2489
              </p>

              <p>
                ✉️ Email: wave@calgary.ca.
              </p>

              <p>
                🌐 Website: www.calgary.ca
              </p>
            </div>
          </div>

        </div>

      </div>

    </footer>
  );
}
