"use client"

import { ImageIcon, Minus, Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { AnimatedBeamDemo } from "../logo-animation/AnimatedBeam"

export default function ProductCard() {

    const containerRef = useRef(null)
    const fromRef = useRef(null)
    const toRef = useRef(null)

  return (
    <div className="flex pb-4 md:pb-0">
        <AnimatedBeamDemo />
    </div>
  )
}

