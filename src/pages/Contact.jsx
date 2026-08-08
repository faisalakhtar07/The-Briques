import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import Button from '../components/Button'

export default function Contact() {
  return (
    <div className="section-pad bg-paper">
      <div className="container-app grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <SectionHeading
            eyebrow="Contact"
            title="Get in Touch"
            subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            align="left"
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Phone size={18} />
              </span>
              <div>
                <p className="text-xs text-ink/45">Phone</p>
                <p className="text-sm font-semibold text-ink">+91 8789502494</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-xs text-ink/45">Email</p>
                <p className="text-sm font-semibold text-ink">info@thebuilderbazar.com</p>
              </div>
            </div>
          </div>

          <Button href="https://wa.me/918789502494" variant="primary" icon={MessageCircle} className="w-fit">
            WhatsApp Us
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  )
}
