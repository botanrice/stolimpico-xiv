import { motion } from "framer-motion";
import { IconLinks } from '../../data/iconlinks';
import { LinkIcon } from './LinkIcon';

export const TrackInfoLinks = () => (
  <>
    <motion.div
      className="flex justify-between items-center text-sm mb-4 md:justify-center md:gap-4 md:mb-0"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <a 
        href="https://bio.site/lowjamz" 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline underline-offset-2 decoration-[#dfb74b] decoration-2"
      >
        leverson
      </a>
      <a 
        href="https://borice.exposed" 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline underline-offset-2 decoration-[#dfb74b] decoration-2"
      >
        stoic da poet
      </a>
    </motion.div>
    <motion.div
      id="link-icon-container" 
      className="w-full grid grid-cols-3 gap-y-2 pt-4 pb-0 md:justify-items-start md:w-2/3"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {IconLinks.map((link) => (
        <LinkIcon 
          key={link.id}
          src={link.icon} 
          alt={link.name} 
          href={link.url} 
          text={link.name.charAt(0).toUpperCase() + link.name.slice(1)} />
      ))}
    </motion.div>
  </>
);
