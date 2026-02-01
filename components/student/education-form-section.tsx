'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SaveNotification } from './save-notification'
import { GraduationCap, Trash2, Plus } from 'lucide-react'

interface Education {
  id: string
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
}

export function EducationFormSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      school: 'FAST University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2020',
      endYear: '2024',
    },
  ])
  const [editEducations, setEditEducations] = useState(educations)

  const handleEdit = () => {
    setEditEducations(educations)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditEducations(educations)
  }

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
    }
    setEditEducations([...editEducations, newEdu])
  }

  const handleRemoveEducation = (id: string) => {
    setEditEducations(editEducations.filter((edu) => edu.id !== id))
  }

  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEditEducations(
      editEducations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setEducations(editEducations)
    setIsSaving(false)
    setIsEditing(false)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <div className="space-y-4">
              {educations.length > 0 ? (
                educations.map((edu) => (
                  <div key={edu.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.field}</p>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No education details added yet.</p>
              )}
              <Button onClick={handleEdit} className="mt-4">
                Edit Education
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {editEducations.map((edu, idx) => (
                <div key={edu.id} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-foreground">Education {idx + 1}</h4>
                    {editEducations.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`school-${edu.id}`} className="text-xs font-semibold mb-2 block">
                        School/University
                      </Label>
                      <Input
                        id={`school-${edu.id}`}
                        value={edu.school}
                        onChange={(e) =>
                          handleEducationChange(edu.id, 'school', e.target.value)
                        }
                        placeholder="School or University name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`degree-${edu.id}`} className="text-xs font-semibold mb-2 block">
                          Degree
                        </Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(edu.id, 'degree', e.target.value)
                          }
                          placeholder="e.g., Bachelor of Science"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`field-${edu.id}`} className="text-xs font-semibold mb-2 block">
                          Field of Study
                        </Label>
                        <Input
                          id={`field-${edu.id}`}
                          value={edu.field}
                          onChange={(e) =>
                            handleEducationChange(edu.id, 'field', e.target.value)
                          }
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`startYear-${edu.id}`} className="text-xs font-semibold mb-2 block">
                          Start Year
                        </Label>
                        <Input
                          id={`startYear-${edu.id}`}
                          value={edu.startYear}
                          onChange={(e) =>
                            handleEducationChange(edu.id, 'startYear', e.target.value)
                          }
                          placeholder="2020"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`endYear-${edu.id}`} className="text-xs font-semibold mb-2 block">
                          End Year
                        </Label>
                        <Input
                          id={`endYear-${edu.id}`}
                          value={edu.endYear}
                          onChange={(e) =>
                            handleEducationChange(edu.id, 'endYear', e.target.value)
                          }
                          placeholder="2024"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={handleAddEducation}
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </Button>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showSaved && (
        <SaveNotification message="Education details updated successfully!" />
      )}
    </>
  )
}
