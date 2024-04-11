import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faSquareFacebook,
  faInstagram,
  faPinterest,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto flex flex-wrap px-4 md:px-8">
        {/* First Column */}
        <div className="w-full lg:w-1/6 md:w-1/2 mb-4 md:mb-0 pr-2">
          <h2 className="text-lg font-bold mb-2 text-gray-800">dribbble</h2>
          <p className="text-sm mb-4">
            Dribble is the world's leading community for creatives to share,
            grow and get hired.
          </p>
          <div className="flex">
            <Link>
              <FontAwesomeIcon icon={faDribbble} className="mr-3" />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faTwitter} className="mr-3" />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faSquareFacebook} className="mr-3" />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faInstagram} className="mr-3" />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faPinterest} className="mr-3" />
            </Link>
          </div>
        </div>

        {/* Second Column */}
        <div className="w-full lg:w-1/6 md:w-1/2 mb-4 md:mb-0 pr-2">
          <h2 className="text-lg font-bold mb-2 text-gray-800">
            For designers
          </h2>
          <ul className="text-sm flex flex-col gap-3">
            <li>
              <Link href="#">Go Pro</Link>
            </li>
            <li>
              <Link href="#">Explore Design Work</Link>
            </li>
            <li>
              <Link href="#">Design Blog</Link>
            </li>
            <li>
              <Link href="#">Overtime podcast</Link>
            </li>
            <li>
              <Link href="#">Playoffs</Link>
            </li>
            <li>
              <Link href="#">Weekly Warm-Up</Link>
            </li>
            <li>
              <Link href="#">Refer a Friend</Link>
            </li>
            <li>
              <Link href="#">Code of Conduct</Link>
            </li>
          </ul>
        </div>

        {/* Third Column */}
        <div className="w-full lg:w-1/6 md:w-1/2 mb-4 md:mb-0 pr-2">
          <h2 className="text-lg font-bold mb-2 text-gray-800">
            Hire Designers
          </h2>
          <ul className="text-sm flex flex-col gap-3">
            <li>
              <Link href="#">Post a job Opening</Link>
            </li>
            <li>
              <Link href="#">Post a freelance project</Link>
            </li>
            <li>
              <Link href="#">Search for Designers</Link>
            </li>
            <li>
              <Link href="#">Brands</Link>
            </li>
            <li>
              <Link href="#">Advertise with us</Link>
            </li>
          </ul>
        </div>

        {/* Fourth Column */}
        <div className="w-full lg:w-1/6 md:w-1/2 mb-4 md:mb-0 pr-2">
          <h2 className="text-lg font-bold mb-2 text-gray-800">Company</h2>
          <ul className="text-sm flex flex-col gap-3">
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Support</Link>
            </li>
            <li>
              <Link href="#">Media Kit</Link>
            </li>
            <li>
              <Link href="#">Testimonials</Link>
            </li>
            <li>
              <Link href="#">API</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Cookie Policy</Link>
            </li>
          </ul>
        </div>

        {/* Fifth Column */}
        <div className="w-full lg:w-1/6 md:w-1/2 mb-4 md:mb-0 pr-2">
          <div>
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              Directories
            </h2>
            <ul className="text-sm flex flex-col gap-3">
              <li>
                <Link href="#">Design Jobs</Link>
              </li>
              <li>
                <Link href="#">Designers for hire</Link>
              </li>
              <li>
                <Link href="#">Freelance Designers for hire</Link>
              </li>
              <li>
                <Link href="#">Tags</Link>
              </li>
              <li>
                <Link href="#">Places</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              Design Assets
            </h2>
            <ul className="text-sm flex flex-col gap-3">
              <li>
                <Link href="#">Dribbble Marketplace</Link>
              </li>
              <li>
                <Link href="#">Creative Market</Link>
              </li>
              <li>
                <Link href="#">FontSpring</Link>
              </li>
              <li>
                <Link href="#">Font Squirrel</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-1/6 md:w-1/2 mb-4 md:mb-0 pr-2">
          <h2 className="text-lg font-bold mb-2 text-gray-800">
            Design Resources
          </h2>
          <ul className="text-sm flex flex-col gap-3">
            <li>
              <Link href="#">Freelancing</Link>
            </li>
            <li>
              <Link href="#">Design Hiring</Link>
            </li>
            <li>
              <Link href="#">Design Portfolio</Link>
            </li>
            <li>
              <Link href="#">Design Education</Link>
            </li>
            <li>
              <Link href="#">Creative Process</Link>
            </li>
            <li>
              <Link href="#">Design Industry Trends</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
