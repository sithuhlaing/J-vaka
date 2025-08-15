"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { FormBuilder } from "@/components/organisms/form-builder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  FileText, 
  Edit, 
  Copy, 
  Trash2, 
  Download,
  Upload,
  Search,
  Filter
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface FormTemplate {
  id: string
  name: string
  description: string
  category: string
  rows: any[]
  metadata?: {
    version: string
    createdAt: string
    updatedAt: string
    createdBy: string
    usageCount: number
  }
}

export default function OHFormBuilder() {
  const [user, setUser] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("library")
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [editingForm, setEditingForm] = useState<FormTemplate | null>(null)
  const [savedForms, setSavedForms] = useState<FormTemplate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  // Mock saved forms data
  const mockSavedForms: FormTemplate[] = [
    {
      id: "form_001",
      name: "Annual Health Assessment",
      description: "Comprehensive annual health review for all employees",
      category: "health-check",
      rows: [],
      metadata: {
        version: "2.1",
        createdAt: "2024-01-15T09:00:00Z",
        updatedAt: "2024-03-10T14:30:00Z",
        createdBy: "Dr. Sarah Smith",
        usageCount: 156
      }
    },
    {
      id: "form_002", 
      name: "Return to Work Assessment",
      description: "Assessment for employees returning after illness or injury",
      category: "return-to-work",
      rows: [],
      metadata: {
        version: "1.8",
        createdAt: "2024-02-01T10:15:00Z",
        updatedAt: "2024-03-05T11:20:00Z",
        createdBy: "Dr. Michael Johnson",
        usageCount: 89
      }
    },
    {
      id: "form_003",
      name: "Workplace Incident Report",
      description: "Detailed incident reporting form for workplace injuries",
      category: "incident",
      rows: [],
      metadata: {
        version: "3.0",
        createdAt: "2024-01-20T13:45:00Z",
        updatedAt: "2024-03-15T16:10:00Z",
        createdBy: "Safety Team",
        usageCount: 234
      }
    },
    {
      id: "form_004",
      name: "Pre-Employment Health Screen",
      description: "Health screening questionnaire for new hires",
      category: "pre-employment",
      rows: [],
      metadata: {
        version: "1.5",
        createdAt: "2024-02-10T08:30:00Z",
        updatedAt: "2024-02-25T10:15:00Z",
        createdBy: "HR Department",
        usageCount: 67
      }
    },
    {
      id: "form_005",
      name: "Mental Health Check-in",
      description: "Confidential mental health and wellbeing assessment",
      category: "mental-health",
      rows: [],
      metadata: {
        version: "2.3",
        createdAt: "2024-01-05T11:20:00Z",
        updatedAt: "2024-03-12T15:45:00Z",
        createdBy: "Wellbeing Team",
        usageCount: 198
      }
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setSavedForms(mockSavedForms)
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  const categories = [
    { value: "all", label: "All Forms", count: mockSavedForms.length },
    { value: "health-check", label: "Health Checks", count: 2 },
    { value: "return-to-work", label: "Return to Work", count: 1 },
    { value: "incident", label: "Incident Reports", count: 1 },
    { value: "pre-employment", label: "Pre-Employment", count: 1 },
    { value: "mental-health", label: "Mental Health", count: 1 }
  ]

  const filteredForms = savedForms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSaveForm = (template: FormTemplate) => {
    console.log("Saving form:", template)
    setSavedForms(prev => {
      if (editingForm) {
        return prev.map(form => form.id === editingForm.id ? template : form)
      } else {
        return [...prev, template]
      }
    })
    setIsBuilderOpen(false)
    setEditingForm(null)
    setActiveTab("library")
  }

  const handlePreviewForm = (template: FormTemplate) => {
    console.log("Previewing form:", template)
    // Here you would open a preview modal or navigate to a preview page
  }

  const handleEditForm = (form: FormTemplate) => {
    setEditingForm(form)
    setIsBuilderOpen(true)
    setActiveTab("builder")
  }

  const handleDuplicateForm = (form: FormTemplate) => {
    const duplicatedForm = {
      ...form,
      id: "form_" + Date.now(),
      name: form.name + " (Copy)",
      metadata: {
        ...form.metadata!,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0
      }
    }
    setSavedForms(prev => [...prev, duplicatedForm])
  }

  const handleDeleteForm = (formId: string) => {
    if (confirm("Are you sure you want to delete this form? This action cannot be undone.")) {
      setSavedForms(prev => prev.filter(form => form.id !== formId))
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "health-check": "bg-green-100 text-green-800",
      "return-to-work": "bg-blue-100 text-blue-800",
      "incident": "bg-red-100 text-red-800",
      "pre-employment": "bg-purple-100 text-purple-800",
      "mental-health": "bg-orange-100 text-orange-800"
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (isBuilderOpen) {
    return (
      <MainLayout>
        <div className="h-screen overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h1 className="text-2xl font-bold">
                {editingForm ? `Editing: ${editingForm.name}` : "Create New Form"}
              </h1>
              <p className="text-muted-foreground">Build clinical assessment forms</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsBuilderOpen(false)
                setEditingForm(null)
                setActiveTab("library")
              }}
            >
              Back to Library
            </Button>
          </div>
          
          <FormBuilder
            onSave={handleSaveForm}
            onPreview={handlePreviewForm}
            initialTemplate={editingForm || undefined}
            className="p-4"
          />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clinical Form Builder</h1>
            <p className="text-muted-foreground">Create and manage assessment forms for occupational health</p>
          </div>
          <Button 
            className="flex items-center gap-2" 
            onClick={() => {
              setEditingForm(null)
              setIsBuilderOpen(true)
              setActiveTab("builder")
            }}
          >
            <Plus className="h-4 w-4" />
            Create New Form
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Form Library
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="library" className="mt-6">
            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search forms..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className="flex items-center gap-2"
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <Card key={form.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{form.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {form.description}
                        </CardDescription>
                      </div>
                      <Badge className={getCategoryColor(form.category)}>
                        {form.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Form Metadata */}
                      {form.metadata && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Version:</span>
                            <div className="font-medium">v{form.metadata.version}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Usage:</span>
                            <div className="font-medium">{form.metadata.usageCount} times</div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Created by:</span>
                            <div className="font-medium">{form.metadata.createdBy}</div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Last updated:</span>
                            <div className="font-medium">
                              {new Date(form.metadata.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEditForm(form)}
                        >
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDuplicateForm(form)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteForm(form.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredForms.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No forms found</h3>
                <p className="text-gray-500">Try adjusting your search or create a new form</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Template cards would go here */}
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-48">
                  <Plus className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500">More templates coming soon</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}