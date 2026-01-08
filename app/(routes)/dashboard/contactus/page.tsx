import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

const ContactUs = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-40 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email us</h3>
                            <p className="text-gray-600">support@yourdomain.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Visit us</h3>
                            <p className="text-gray-600">123 Tech Lane, San Francisco, CA</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Call us</h3>
                            <p className="text-gray-600">+1 (555) 000-0000</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white border rounded-2xl p-8 shadow-sm">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="How can we help?" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Your message..."></textarea>
                        </div>
                        <button className="w-full md:w-max px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs