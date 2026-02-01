import { Link } from "react-router-dom";
import Container from "../components/layout/Container";

const Contact = () => {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5600000000004!2d77.209!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a0a75d93c3%3A0x1f355679e0c0e0a!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890";

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Container className="py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wide mb-3">QuickEats</span>
          <h1 className="page-title mb-2">
            Find Us
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Visit our stall for pickup. Pre-order online to skip the queue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="section-card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      Connaught Place, Block A<br />
                      New Delhi, Delhi 110001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+911234567890" className="text-orange-600 hover:underline">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:hello@quickeats.com" className="text-orange-600 hover:underline">
                      hello@quickeats.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">
                      Mon - Sat: 8:00 AM - 10:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-xl bg-orange-50 text-orange-600 font-semibold hover:bg-orange-100 transition-colors"
            >
              View FAQs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Map */}
          <div className="section-card p-0 overflow-hidden">
            <div className="aspect-[4/3]">
              <iframe
                title="Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="p-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Connaught+Place+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-600 font-medium hover:underline"
              >
                Open in Google Maps
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
