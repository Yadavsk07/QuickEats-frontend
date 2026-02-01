import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";

const faqs = [
  {
    q: "How does pickup ordering work?",
    a: "Browse our menu, add items to your cart, and place an order. Pay online or choose cash at counter. We'll prepare your order and notify you when it's ready for pickup. Just come to our stall and collect it—no waiting in line!"
  },
  {
    q: "Do I need an account to order?",
    a: "Yes, you need to create a free account to place orders. This helps us track your order and send you pickup notifications. Registration takes less than a minute."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept online payments (UPI, cards) via Razorpay, or you can pay in cash when you collect your order. Select your preferred option at checkout."
  },
  {
    q: "How will I know when my order is ready?",
    a: "You'll receive real-time updates on the Orders page. When your order status changes to 'Ready for Pickup', come to our stall with your order number to collect it."
  },
  {
    q: "Can I modify or cancel my order?",
    a: "You can cancel your order before we start preparing it. Once preparation has begun, we cannot modify the order. Contact us immediately if you need to cancel."
  },
  {
    q: "What are your operating hours?",
    a: "We're open Monday to Saturday, 8:00 AM to 10:00 PM. We're closed on Sundays. Check the homepage for our current operating status."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Container className="py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wide mb-3">QuickEats</span>
          <h1 className="page-title mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Everything you need to know about ordering from QuickEats
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="section-card p-0 overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset rounded-t-2xl"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FAQs;
