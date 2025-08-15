"use client"

import React, { useEffect, useRef, useState } from "react"
import Sortable from "sortablejs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Type, 
  Calendar, 
  CheckSquare, 
  List, 
  FileText, 
  Hash,
  ToggleLeft,
  Star,
  Save,
  Eye,
  Download,
  Upload,
  Trash2,
  Edit3,
  Copy
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FormElement {
  id: string
  type: string
  label: string
  required: boolean
  options?: string[]
  placeholder?: string
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

interface FormRow {
  id: string
  elements: FormElement[]
}

interface FormTemplate {
  id: string
  name: string
  description: string
  category: string
  rows: FormRow[]
  metadata?: {
    version: string
    createdAt: string
    updatedAt: string
    createdBy: string
  }
}

interface Selection {
  rowIndex: number
  elementIndex: number
}

interface FormBuilderProps {
  onSave?: (template: FormTemplate) => void
  onPreview?: (template: FormTemplate) => void
  initialTemplate?: FormTemplate
  className?: string
}

export function FormBuilder({ 
  onSave, 
  onPreview, 
  initialTemplate,
  className = ""
}: FormBuilderProps) {
  const libRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState<FormRow[]>(initialTemplate?.rows || [])
  const [selected, setSelected] = useState<Selection | null>(null)
  const [formMetadata, setFormMetadata] = useState({
    name: initialTemplate?.name || "",
    description: initialTemplate?.description || "",
    category: initialTemplate?.category || "assessment"
  })
  const [jsonOutput, setJsonOutput] = useState("")
  const idRef = useRef(1)

  // Available form elements
  const elementLibrary = [
    { type: 'layout-row', label: 'Layout Row', icon: Plus, description: 'Add a new row for elements' },
    { type: 'text', label: 'Text Input', icon: Type, description: 'Single line text field' },
    { type: 'textarea', label: 'Textarea', icon: FileText, description: 'Multi-line text area' },
    { type: 'select', label: 'Dropdown', icon: List, description: 'Dropdown selection' },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Checkbox input' },
    { type: 'radio', label: 'Radio Button', icon: ToggleLeft, description: 'Radio button group' },
    { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
    { type: 'date', label: 'Date Picker', icon: Calendar, description: 'Date selection' },
    { type: 'rating', label: 'Rating', icon: Star, description: 'Star rating input' }
  ]

  // Clinical form templates
  const clinicalTemplates = [
    {
      name: "Annual Health Assessment",
      description: "Comprehensive annual health review form",
      category: "health-check",
      elements: ['text', 'date', 'select', 'textarea', 'checkbox']
    },
    {
      name: "Return to Work Assessment",
      description: "Assessment for employees returning after illness/injury",
      category: "return-to-work",
      elements: ['text', 'textarea', 'select', 'date', 'rating']
    },
    {
      name: "Pre-Employment Health Screen",
      description: "Health screening for new employees",
      category: "pre-employment",
      elements: ['text', 'checkbox', 'select', 'textarea']
    },
    {
      name: "Incident Report Form",
      description: "Workplace incident reporting form",
      category: "incident",
      elements: ['text', 'textarea', 'date', 'select', 'checkbox']
    }
  ]

  // Initialize sortables
  useEffect(() => {
    if (!libRef.current || !canvasRef.current) return

    // Library sortable (for dragging elements)
    const libSortable = Sortable.create(libRef.current, {
      group: { name: 'shared', pull: 'clone', put: false },
      sort: false,
      animation: 150,
      onStart: () => canvasRef.current?.classList.add('ring-2', 'ring-primary', 'ring-opacity-50'),
      onEnd: () => canvasRef.current?.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50')
    })

    // Canvas sortable (for receiving elements)
    const canvasSortable = Sortable.create(canvasRef.current, {
      group: 'shared',
      animation: 150,
      onAdd: (evt: any) => {
        const type = evt.item.dataset.type
        if (type === 'layout-row') {
          addRow()
        }
        evt.item.remove()
      }
    })

    return () => {
      libSortable.destroy()
      canvasSortable.destroy()
    }
  }, [])

  // Initialize row sortables when rows change
  useEffect(() => {
    const rowElements = document.querySelectorAll('[data-row-id]')
    const sortables: any[] = []

    rowElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      if ((htmlEl as any)._sortable) return

      const sortable = Sortable.create(htmlEl, {
        group: 'shared',
        animation: 120,
        onAdd: (evt: any) => {
          const type = evt.item.dataset.type
          const rowId = htmlEl.dataset.rowId
          if (rowId && type !== 'layout-row') {
            addElementToRow(rowId, type)
          }
          evt.item.remove()
        }
      });

      (htmlEl as any)._sortable = sortable
      sortables.push(sortable)
    })

    return () => {
      sortables.forEach(s => s.destroy())
      rowElements.forEach(el => {
        delete (el as any)._sortable
      })
    }
  }, [rows])

  const addRow = () => {
    const id = 'row_' + (idRef.current++)
    setRows(prev => [...prev, { id, elements: [] }])
  }

  const addElementToRow = (rowId: string, type: string) => {
    const id = 'elem_' + (idRef.current++)
    const newElement: FormElement = {
      id,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      placeholder: type === 'textarea' ? 'Enter detailed information...' : `Enter ${type}...`,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2', 'Option 3'] : undefined
    }

    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        return { ...row, elements: [...row.elements, newElement] }
      }
      return row
    }))
  }

  const removeRow = (rowId: string) => {
    setRows(prev => prev.filter(row => row.id !== rowId))
    setSelected(null)
  }

  const removeElement = (rowId: string, elementId: string) => {
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        return { ...row, elements: row.elements.filter(el => el.id !== elementId) }
      }
      return row
    }))
    setSelected(null)
  }

  const updateElement = (rowId: string, elementId: string, updates: Partial<FormElement>) => {
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          elements: row.elements.map(el => 
            el.id === elementId ? { ...el, ...updates } : el
          )
        }
      }
      return row
    }))
  }

  const selectElement = (rowIndex: number, elementIndex: number) => {
    setSelected({ rowIndex, elementIndex })
  }

  const generateFormTemplate = (): FormTemplate => {
    return {
      id: 'form_' + Date.now(),
      name: formMetadata.name,
      description: formMetadata.description,
      category: formMetadata.category,
      rows,
      metadata: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current-user' // This would come from auth context
      }
    }
  }

  const handleSave = () => {
    const template = generateFormTemplate()
    setJsonOutput(JSON.stringify(template, null, 2))
    if (onSave) {
      onSave(template)
    }
  }

  const handlePreview = () => {
    const template = generateFormTemplate()
    if (onPreview) {
      onPreview(template)
    }
  }

  const loadTemplate = (template: typeof clinicalTemplates[0]) => {
    setFormMetadata({
      name: template.name,
      description: template.description,
      category: template.category
    })
    
    // Create a sample form based on template elements
    const sampleRow: FormRow = {
      id: 'row_' + (idRef.current++),
      elements: template.elements.map((type, index) => ({
        id: 'elem_' + (idRef.current++),
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field ${index + 1}`,
        required: index === 0, // Make first field required
        placeholder: `Enter ${type}...`,
        options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2', 'Option 3'] : undefined
      }))
    }
    
    setRows([sampleRow])
  }

  const getSelectedElement = (): FormElement | null => {
    if (!selected) return null
    const row = rows[selected.rowIndex]
    return row?.elements[selected.elementIndex] || null
  }

  const renderFormElement = (element: FormElement, rowId: string, rowIndex: number, elementIndex: number) => {
    const isSelected = selected?.rowIndex === rowIndex && selected?.elementIndex === elementIndex

    const baseProps = {
      className: cn(
        "relative border-2 border-dashed border-gray-300 p-3 rounded-md cursor-pointer transition-all",
        "hover:border-primary hover:bg-primary/5",
        isSelected && "border-primary bg-primary/10 ring-2 ring-primary ring-opacity-20"
      ),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        selectElement(rowIndex, elementIndex)
      }
    }

    return (
      <div key={element.id} {...baseProps}>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{element.label}</Label>
          <div className="flex gap-1">
            {element.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                removeElement(rowId, element.id)
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Render preview of form element */}
        {element.type === 'text' && (
          <Input placeholder={element.placeholder} disabled className="opacity-60" />
        )}
        {element.type === 'textarea' && (
          <Textarea placeholder={element.placeholder} disabled className="opacity-60" rows={3} />
        )}
        {element.type === 'select' && (
          <select disabled className="w-full p-2 border rounded opacity-60">
            <option>Select an option...</option>
            {element.options?.map((option, i) => (
              <option key={i}>{option}</option>
            ))}
          </select>
        )}
        {element.type === 'checkbox' && (
          <div className="flex items-center space-x-2 opacity-60">
            <Checkbox disabled />
            <span className="text-sm">Checkbox option</span>
          </div>
        )}
        {element.type === 'radio' && (
          <div className="space-y-2 opacity-60">
            {element.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input type="radio" disabled className="opacity-60" />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        )}
        {element.type === 'number' && (
          <Input type="number" placeholder="Enter number..." disabled className="opacity-60" />
        )}
        {element.type === 'date' && (
          <Input type="date" disabled className="opacity-60" />
        )}
        {element.type === 'rating' && (
          <div className="flex gap-1 opacity-60">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="h-5 w-5 text-gray-400" />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-12 gap-6 h-screen">
        {/* Left Sidebar - Element Library */}
        <div className="col-span-3 space-y-6">
          {/* Form Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="formName">Form Name</Label>
                <Input
                  id="formName"
                  value={formMetadata.name}
                  onChange={(e) => setFormMetadata(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter form name..."
                />
              </div>
              <div>
                <Label htmlFor="formDescription">Description</Label>
                <Textarea
                  id="formDescription"
                  value={formMetadata.description}
                  onChange={(e) => setFormMetadata(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the form purpose..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="formCategory">Category</Label>
                <select
                  id="formCategory"
                  value={formMetadata.category}
                  onChange={(e) => setFormMetadata(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border border-input rounded-md text-sm"
                >
                  <option value="assessment">Health Assessment</option>
                  <option value="screening">Health Screening</option>
                  <option value="incident">Incident Report</option>
                  <option value="return-to-work">Return to Work</option>
                  <option value="pre-employment">Pre-Employment</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
              <CardDescription>Start with pre-built clinical forms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {clinicalTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => loadTemplate(template)}
                >
                  <div>
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Element Library */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Elements</CardTitle>
              <CardDescription>Drag elements to build your form</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={libRef} className="space-y-2">
                {elementLibrary.map((element) => {
                  const Icon = element.icon
                  return (
                    <div
                      key={element.type}
                      data-type={element.type}
                      className="flex items-center gap-3 p-3 border border-border rounded-md cursor-grab hover:bg-accent transition-colors"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{element.label}</div>
                        <div className="text-xs text-muted-foreground">{element.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center - Form Canvas */}
        <div className="col-span-6">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Form Canvas</CardTitle>
                  <CardDescription>Drag elements here to build your form</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Form
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={canvasRef}
                className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all"
              >
                {rows.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Plus className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-600">Start Building Your Form</p>
                    <p className="text-sm text-gray-500">Drag the "Layout Row" element here to begin</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rows.map((row, rowIndex) => (
                      <div
                        key={row.id}
                        className="border border-border rounded-lg p-4 bg-background"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-sm">Row {rowIndex + 1}</h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => removeRow(row.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div
                          data-row-id={row.id}
                          className="min-h-[60px] border border-dashed border-gray-200 rounded p-3 space-y-3"
                        >
                          {row.elements.length === 0 ? (
                            <div className="text-center text-sm text-gray-500 py-4">
                              Drop form elements here
                            </div>
                          ) : (
                            row.elements.map((element, elementIndex) =>
                              renderFormElement(element, row.id, rowIndex, elementIndex)
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Element Properties */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Element Properties</CardTitle>
              <CardDescription>
                {selected ? "Customize the selected element" : "Select an element to edit properties"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selected && getSelectedElement() ? (
                <ElementPropertiesPanel
                  element={getSelectedElement()!}
                  onUpdate={(updates) => {
                    const row = rows[selected.rowIndex]
                    const element = row.elements[selected.elementIndex]
                    updateElement(row.id, element.id, updates)
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <Edit3 className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Select a form element to edit its properties</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* JSON Output Modal/Section - for debugging */}
      {jsonOutput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Generated Form JSON</h3>
              <Button variant="ghost" size="sm" onClick={() => setJsonOutput("")}>
                ✕
              </Button>
            </div>
            <pre className="text-sm bg-gray-100 p-4 rounded overflow-x-auto">
              {jsonOutput}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

// Element Properties Panel Component
function ElementPropertiesPanel({ 
  element, 
  onUpdate 
}: { 
  element: FormElement
  onUpdate: (updates: Partial<FormElement>) => void 
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="elementLabel">Label</Label>
        <Input
          id="elementLabel"
          value={element.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="elementPlaceholder">Placeholder</Label>
        <Input
          id="elementPlaceholder"
          value={element.placeholder || ''}
          onChange={(e) => onUpdate({ placeholder: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="elementRequired"
          checked={element.required}
          onCheckedChange={(checked) => onUpdate({ required: checked as boolean })}
        />
        <Label htmlFor="elementRequired">Required field</Label>
      </div>

      {(element.type === 'select' || element.type === 'radio') && (
        <div>
          <Label>Options (one per line)</Label>
          <Textarea
            value={element.options?.join('\n') || ''}
            onChange={(e) => {
              const options = e.target.value.split('\n').filter(opt => opt.trim())
              onUpdate({ options })
            }}
            rows={4}
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>
      )}

      {element.type === 'text' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="minLength">Minimum Length</Label>
            <Input
              id="minLength"
              type="number"
              value={element.validation?.minLength || ''}
              onChange={(e) => onUpdate({ 
                validation: { 
                  ...element.validation, 
                  minLength: parseInt(e.target.value) || undefined 
                } 
              })}
            />
          </div>
          <div>
            <Label htmlFor="maxLength">Maximum Length</Label>
            <Input
              id="maxLength"
              type="number"
              value={element.validation?.maxLength || ''}
              onChange={(e) => onUpdate({ 
                validation: { 
                  ...element.validation, 
                  maxLength: parseInt(e.target.value) || undefined 
                } 
              })}
            />
          </div>
        </div>
      )}
    </div>
  )
}