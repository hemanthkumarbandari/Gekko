'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  service: z.enum(['3d', 'product', 'data', 'ui', 'other']),
  message: z.string().min(20, 'Tell us more (at least 20 chars)'),
  budget: z.enum(['5-15', '15-30', '30-60', '60+']),
})

type ContactFormValues = z.infer<typeof contactSchema>

const serviceOptions = [
  { value: '3d', label: '3D Web' },
  { value: 'product', label: 'Digital Product' },
  { value: 'data', label: 'Data & Analytics' },
  { value: 'ui', label: 'UI / UX' },
  { value: 'other', label: 'Other' },
] as const

const budgetOptions = [
  { value: '5-15', label: '$5k–15k' },
  { value: '15-30', label: '$15k–30k' },
  { value: '30-60', label: '$30k–60k' },
  { value: '60+', label: '$60k+' },
] as const

const errorVariant = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.25 } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [shakeError, setShakeError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 60, damping: 14 })
  const springY = useSpring(rotY, { stiffness: 60, damping: 14 })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotX.set(((e.clientY - cy) / rect.height) * -6)
    rotY.set(((e.clientX - cx) / rect.width) * 8)
  }

  const onMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  const onSubmit = async (_data: ContactFormValues) => {
    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  const onError = () => {
    setShakeError(true)
    setTimeout(() => setShakeError(false), 600)
  }

  return (
    <section id="contact" className="relative z-10 py-28">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-glacier text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] text-night leading-tight">
            Let&apos;s Build Something
            <br />
            <span className="text-glacier">Unforgettable</span>
          </h2>
          <p className="font-body text-base text-deep/60 mt-4 max-w-lg mx-auto">
            Tell us what you&apos;re building. We&apos;ll tell you if it can be extraordinary.
          </p>
        </motion.div>

        {/* Form card with 3D tilt */}
        <motion.div
          ref={cardRef}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1200px' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            style={{ rotateX: springX, rotateY: springY }}
            animate={shakeError ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
            transition={shakeError ? { duration: 0.4 } : {}}
            className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-glass"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  >
                    <CheckCircle size={56} className="text-glacier" />
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl text-night">Message received.</h3>
                  <p className="font-body text-base text-deep/60 max-w-sm">
                    We read every brief. Expect a reply within 24 hours — we don&apos;t do boilerplate responses.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="flex flex-col gap-6"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-deep/60 uppercase tracking-wider mb-1.5 block">
                        Name
                      </label>
                      <input
                        {...register('name')}
                        placeholder="Your name"
                        className="w-full bg-white/60 border border-glacier/30 rounded-xl px-4 py-3 font-body text-sm text-night placeholder:text-deep/30 outline-none focus:border-glacier focus:ring-1 focus:ring-glacier/30 transition-all"
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            variants={errorVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="font-body text-xs text-red-400 mt-1 overflow-hidden"
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-deep/60 uppercase tracking-wider mb-1.5 block">
                        Email
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="you@company.com"
                        className="w-full bg-white/60 border border-glacier/30 rounded-xl px-4 py-3 font-body text-sm text-night placeholder:text-deep/30 outline-none focus:border-glacier focus:ring-1 focus:ring-glacier/30 transition-all"
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            variants={errorVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="font-body text-xs text-red-400 mt-1 overflow-hidden"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Service picker */}
                  <div>
                    <label className="font-body text-xs font-semibold text-deep/60 uppercase tracking-wider mb-1.5 block">
                      Service
                    </label>
                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {serviceOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => field.onChange(opt.value)}
                              className={cn(
                                'px-4 py-2 rounded-full font-body text-sm font-medium border transition-all',
                                field.value === opt.value
                                  ? 'bg-glacier text-white border-glacier shadow-ice'
                                  : 'bg-white/50 text-deep/70 border-glacier/30 hover:border-glacier/60'
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                    <AnimatePresence>
                      {errors.service && (
                        <motion.p
                          variants={errorVariant}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="font-body text-xs text-red-400 mt-1 overflow-hidden"
                        >
                          {errors.service.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Budget picker */}
                  <div>
                    <label className="font-body text-xs font-semibold text-deep/60 uppercase tracking-wider mb-1.5 block">
                      Budget
                    </label>
                    <Controller
                      name="budget"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {budgetOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => field.onChange(opt.value)}
                              className={cn(
                                'px-4 py-2 rounded-full font-body text-sm font-medium border transition-all',
                                field.value === opt.value
                                  ? 'bg-deep text-white border-deep'
                                  : 'bg-white/50 text-deep/70 border-glacier/30 hover:border-glacier/60'
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                    <AnimatePresence>
                      {errors.budget && (
                        <motion.p
                          variants={errorVariant}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="font-body text-xs text-red-400 mt-1 overflow-hidden"
                        >
                          {errors.budget.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-body text-xs font-semibold text-deep/60 uppercase tracking-wider mb-1.5 block">
                      Tell us about the project
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="What are you building? What's broken? What needs to be extraordinary?"
                      className="w-full bg-white/60 border border-glacier/30 rounded-xl px-4 py-3 font-body text-sm text-night placeholder:text-deep/30 outline-none focus:border-glacier focus:ring-1 focus:ring-glacier/30 transition-all resize-none"
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          variants={errorVariant}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="font-body text-xs text-red-400 mt-1 overflow-hidden"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <MagneticButton className="self-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier to-deep text-white font-body font-semibold px-8 py-3.5 rounded-full hover:shadow-ice transition-shadow disabled:opacity-60"
                    >
                      <motion.span animate={submitting ? { opacity: [1, 0.5, 1] } : {}}>
                        {submitting ? 'Sending...' : 'Send Brief'}
                      </motion.span>
                      <Send size={16} />
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
