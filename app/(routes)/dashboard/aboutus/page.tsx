import React from 'react'
import Image from 'next/image'

const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-40 py-16">
            <section className="text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Mission</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    We are dedicated to providing the best tools for your workflow.
                    Our platform simplifies complex tasks so you can focus on what truly matters:
                    growing your business and reaching your goals.
                </p>
            </section>
            <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
                {[
                    { label: 'Founded', value: '2023' },
                    { label: 'Happy Users', value: '10k+' },
                    { label: 'Uptime', value: '99.9%' }
                ].map((stat, i) => (
                    <div key={i} className="p-8 border rounded-2xl shadow-sm bg-white">
                        <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                        <p className="text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">Why we built this</h2>
                    <p className="text-gray-600 mb-4">
                        It started with a simple problem: there weren't enough efficient ways to manage
                        digital assets without getting bogged down by technical debt.
                    </p>
                    <p className="text-gray-600">
                        Today, we are a global team of developers and designers committed to
                        excellence, transparency, and innovation.
                    </p>
                </div>
                <div className="flex-1 w-full h-64 bg-gray-100 rounded-3xl relative overflow-hidden">
                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                        <Image src={'/medical-assistance.png'} alt='image' height={200} width={200}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs