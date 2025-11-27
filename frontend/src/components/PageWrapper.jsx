// import { motion } from "framer-motion";

// const PageWrapper = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}   // start state
//       animate={{ opacity: 1, y: 0 }}    // on mount
//       exit={{ opacity: 0, y: -20 }}     // on unmount (when navigating away)
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       className="w-full h-full"
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default PageWrapper;





















import { motion } from "framer-motion";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default PageWrapper;

