"use client"
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const styles = ['Minimalist', 'Professional', 'Creative']
const industries = ['Tech', 'Education', 'Marketing', 'Finance', 'Healthcare']

export default function FilterOptions() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])

  const handleStyleChange = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    )
  }

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    )
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Filter Options</h2>
      <div className="flex flex-wrap gap-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Style</h3>
          <div className="flex flex-wrap gap-2">
            {styles.map(style => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={selectedStyles.includes(style)}
                  onCheckedChange={() => handleStyleChange(style)}
                />
                <Label htmlFor={`style-${style}`}>{style}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Industry</h3>
          <div className="flex flex-wrap gap-2">
            {industries.map(industry => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={`industry-${industry}`}
                  checked={selectedIndustries.includes(industry)}
                  onCheckedChange={() => handleIndustryChange(industry)}
                />
                <Label htmlFor={`industry-${industry}`}>{industry}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

