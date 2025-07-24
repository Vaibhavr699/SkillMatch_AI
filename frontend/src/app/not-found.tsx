'use client';

import { motion } from 'framer-motion';
import { Compass, Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1, rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-r from-orange-600 to-red-600 rounded-full filter blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      ></div>

      {/* Floating Decorative Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-20 w-8 h-8 border-2 border-amber-600/30 rounded-lg rotate-45 hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute top-40 right-32 w-6 h-6 bg-orange-600/20 rounded-full hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
        className="absolute bottom-32 left-16 w-10 h-10 border border-amber-600/40 rounded-full hidden lg:block"
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full mx-4"
      >
        {/* Glass Card Container */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden w-full"
        >
          {/* Decorative Gradients */}
          <div className="absolute top-0 right-0 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-gradient-to-bl from-amber-600/10 to-transparent rounded-full -mr-10 sm:-mr-12 lg:-mr-16 -mt-10 sm:-mt-12 lg:-mt-16"></div>
          <div className="absolute bottom-0 left-0 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-tr from-orange-600/10 to-transparent rounded-full -ml-8 sm:-ml-10 lg:-ml-12 -mb-8 sm:-mb-10 lg:-mb-12"></div>

          {/* Animated Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative p-3 sm:p-4 lg:p-2 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl sm:rounded-2xl shadow-lg"
            >
              <Compass className="w-4 h-4 lg:w-8 lg:h-8 text-white drop-shadow-lg" />
              {/* Pulse Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-amber-600/30 rounded-xl sm:rounded-2xl"
              />
            </motion.div>
          </motion.div>

          {/* 404 Text */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-4 sm:mb-6"
          >
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: 0.2,
                duration: 0.8 
              }}
              className="text-4xl sm:text-2xl lg:text-4xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight"
            >
              404
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-slate-200 mb-2 sm:mb-3">
                Page Not Found
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-xs sm:max-w-sm lg:max-w-md mx-auto leading-relaxed px-2">
                The page you're looking for seems to have wandered off into the digital void. 
                Let's navigate you back to familiar territory.
              </p>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6"
          >
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-semibold text-base sm:text-lg rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Home className="w-4 h-4  relative z-10 group-hover:scale-110 transition-transform duration-200" />
              <span className="relative z-10">Back to Home</span>
            </motion.button>

            {/* Secondary Button */}
            
          </motion.div>

          {/* Helper Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-700/50"
          >
            <motion.a
              href="/search"
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors duration-200 group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Search</span>
            </motion.a>
            <motion.a
              href="/help"
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors duration-200 group"
            >
              <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Help Center</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 sm:mt-8 text-center text-slate-500 text-xs sm:text-sm px-4"
        >
          Error Code: 404 • If this problem persists, please{' '}
          <a 
            href="/contact" 
            className="text-amber-400 hover:text-amber-300 transition-colors duration-200 underline underline-offset-2"
          >
            contact support
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}