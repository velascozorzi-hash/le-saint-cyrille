"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"

const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
    label: "L'assiette égyptienne",
  },
  {
    url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
    label: "La salle",
  },
  {
    url: "https://images.unsplash.com/photo-1525518392674-39ba1fca2ec2?w=1200&q=80",
    label: "Falafels maison",
  },
  {
    url: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=1200&q=80",
    label: "Pâtisseries du jour",
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    label: "L'ambiance",
  },
  {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80",
    label: "Grillades",
  },
  {
    url: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=1200&q=80",
    label: "La terrasse",
  },
]

function GalleryItem({
  index,
  item,
  onInView,
}: {
  index: number
  item: (typeof galleryItems)[0]
  onInView: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    if (isInView) onInView(index)
  }, [isInView, index, onInView])

  return (
    <div
      ref={ref}
      className="h-screen w-full flex items-center justify-center snap-center px-8"
    >
      <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={item.url}
          alt={item.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full text-sm italic"
          style={{
            background: "rgba(248,241,227,0.9)",
            fontFamily: "'Fraunces', serif",
            color: "#2A211A",
          }}
        >
          {item.label}
        </span>
      </div>
    </div>
  )
}

export function GalerieApercu() {
  const textRotateRef = useRef<TextRotateRef>(null)

  const handleInView = useCallback((index: number) => {
    textRotateRef.current?.jumpTo(index)
  }, [])

  return (
    <section
      className="w-full flex"
      style={{ background: "#F0E8D5" }}
      id="galerie"
    >
      {/* Left — sticky heading + rotating label */}
      <div className="hidden md:flex w-1/2 sticky top-0 h-screen items-center justify-center flex-col gap-6 pl-16 pr-8">
        <div className="w-full max-w-sm">
          <span
            className="text-xs tracking-widest uppercase mb-3 block"
            style={{ color: "#C0562E", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
          >
            — VI.
          </span>
          <p
            className="text-2xl mb-2"
            style={{
              fontFamily: "'Fraunces', serif",
              color: "#2A211A",
              fontWeight: 400,
            }}
          >
            Un aperçu de{" "}
            <em className="italic" style={{ color: "#C0562E" }}>
              la maison
            </em>
            .
          </p>
          <div
            className="h-12 flex items-center"
            style={{ fontFamily: "'Fraunces', serif", color: "#2A211A" }}
          >
            <TextRotate
              ref={textRotateRef}
              texts={galleryItems.map((g) => g.label)}
              mainClassName="text-3xl font-medium justify-start"
              splitLevelClassName="overflow-hidden pb-1"
              staggerFrom="first"
              staggerDuration={0.018}
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            />
          </div>

          <div
            className="mt-10 text-sm leading-relaxed"
            style={{ color: "#8B7355", fontFamily: "'DM Sans', sans-serif" }}
          >
            Depuis 1985, boulevard Auguste Blanqui.
            <br />
            Une maison, une famille, une cuisine.
          </div>
        </div>
      </div>

      {/* Right — scrollable photos */}
      <div
        className="w-full md:w-1/2 overflow-y-auto snap-y snap-mandatory"
        style={{ height: "100vh" }}
      >
        {/* Mobile heading */}
        <div
          className="md:hidden px-6 pt-16 pb-8"
          style={{ fontFamily: "'Fraunces', serif", color: "#2A211A" }}
        >
          <span
            className="text-xs tracking-widest uppercase block mb-2"
            style={{ color: "#C0562E", fontFamily: "'DM Sans', sans-serif" }}
          >
            — VI.
          </span>
          <p className="text-2xl">
            Un aperçu de{" "}
            <em className="italic" style={{ color: "#C0562E" }}>
              la maison
            </em>
            .
          </p>
        </div>

        {galleryItems.map((item, index) => (
          <GalleryItem
            key={index}
            index={index}
            item={item}
            onInView={handleInView}
          />
        ))}
      </div>
    </section>
  )
}
