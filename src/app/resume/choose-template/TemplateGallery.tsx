"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const templates = [
  {
    id: 1,
    name: 'Minimalist',
    description: 'Clean and simple design for a professional look',
    image: '/template/minimalist.svg?height=400&width=300',
  },
  {
    id: 2,
    name: 'Creative',
    description: 'Stand out with a unique and eye-catching layout',
    image: '/template/minimalist.svg?height=400&width=300',
  },
  {
    id: 3,
    name: 'Professional',
    description: 'Traditional format ideal for corporate environments',
    image: '/template/professional.svg?height=400&width=300',
  },
  // Add more templates as needed
]

export default function TemplateGallery() {
  interface Template {
    id: number;
    name: string;
    description: string;
    image: string;
  }
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            src={template.image}
            alt={template.name}
            width={300}
            height={400}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedTemplate(template)}>
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{template.name}</DialogTitle>
                    <DialogDescription>{template.description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Image
                      src={template.image}
                      alt={template.name}
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => console.log(`Selected template: ${template.name}`)}>
                      Use This Template
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={() => console.log(`Selected template: ${template.name}`)}>
                Choose This Template
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

