import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faWhatsappSquare,
} from '@fortawesome/free-brands-svg-icons';

/**
 * TODO: Add other social links like pinterest, reddit, tumblr, email
 * TODO:
 * TODO: Possibly add native share by using navigator.share
 */

const ShareButtonGroup = ({ data, setRef }) => {
  let title = encodeURIComponent(data.title);
  const brandColors = {
    facebook: '#3b5998',
    whatsapp: '#25d366',
    twitter: '#1da1f2',
  };
  return (
    <div
      social-icon=""
      ref={setRef}
      className="flex flex-1 items-center justify-start md:justify-end"
    >
      <a
        title="Share on Facebook"
        href={`https://www.facebook.com/sharer.php?u=${data.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mx-2 first:mx-0 my-2 font-semibold rounded "
      >
        <FontAwesomeIcon color={brandColors.facebook} size="lg" icon={faFacebookSquare} />
      </a>
      <a
        title="Tweet it"
        href={`https://twitter.com/share?text=${title}-&url=${data.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mx-2 first:mx-0 my-2 font-semibold rounded "
      >
        <FontAwesomeIcon color={brandColors.twitter} size="lg" icon={faTwitterSquare} />
      </a>
      <a
        title="Share on WhatsApp"
        href={`https://api.whatsapp.com/send?text=${title}-${data.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mx-2 first:mx-0 my-2 font-semibold rounded "
      >
        <FontAwesomeIcon color={brandColors.whatsapp} size="lg" icon={faWhatsappSquare} />
      </a>
    </div>
  );
};

export default ShareButtonGroup;
