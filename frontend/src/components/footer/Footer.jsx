import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-orange-100 text-primary-color py-8 rounded-t-lg mt-5">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between px-10">
        {/* Contact Us Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>123 Xa lộ Hà Nội</p>
          <p>Tp HCM</p>
          <p>Email: itbasement@restaurant.com</p>
          <p>Phone: 12345689</p>
        </div>

        {/* Quick Links Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/order" className="hover:underline">Order Online</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} ITBasement. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
