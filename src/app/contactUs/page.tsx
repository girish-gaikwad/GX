"use client"

import { useState, useCallback } from "react"
import { Send, Phone, MapPin, Mail, Clock } from "lucide-react"
import { useTheme } from 'next-themes'

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme } = useTheme()

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-200"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}

      {/* Spotlight effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-75"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.8)'
          }, transparent 40%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24  relative z-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent sm:text-7xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative group">
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200" />
            
            <div className="relative p-8 rounded-lg backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition duration-200"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200" />
              <div className="relative p-8 rounded-lg backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-2xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                  Contact Information
                </h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group/item">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover/item:bg-blue-500/20 transition duration-200">
                      <Phone className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group/item">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover/item:bg-blue-500/20 transition duration-200">
                      <Mail className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-500 dark:text-gray-400">contact@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group/item">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover/item:bg-blue-500/20 transition duration-200">
                      <MapPin className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-500 dark:text-gray-400">123 Business Street</p>
                      <p className="text-gray-500 dark:text-gray-400">New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200" />
              <div className="relative p-8 rounded-lg backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-2xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                  Office Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group/item">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover/item:bg-blue-500/20 transition duration-200">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <p><span className="font-medium">Monday - Friday:</span> <span className="text-gray-500 dark:text-gray-400">9:00 AM - 6:00 PM</span></p>
                      <p><span className="font-medium">Saturday:</span> <span className="text-gray-500 dark:text-gray-400">10:00 AM - 4:00 PM</span></p>
                      <p><span className="font-medium">Sunday:</span> <span className="text-gray-500 dark:text-gray-400">Closed</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage