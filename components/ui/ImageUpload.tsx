import React, { useState, ChangeEvent, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { fileBase64 } from '@/utils/helper'
import Image from 'next/image'

interface ImageUploadProps {
  name: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const { control, setValue, watch } = useFormContext()
  const [previews, setPreviews] = useState<string[]>([])

  const initialFiles = watch(name)

  useEffect(() => {
    if (initialFiles && Array.isArray(initialFiles)) {
      setPreviews(initialFiles)
    }
  }, [initialFiles])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = e.target.files
        const base64Files = await Promise.all(Array.from(files).map(fileBase64))
        setValue(name, base64Files)
        setPreviews(base64Files)
      } catch (error: any) {
        console.error('Error converting files to Base64:', error)
      }
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Input type='file' multiple onChange={handleChange} />
          <div className='flex flex-wrap justify-center'>
            {previews?.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`preview-${index}`}
                height={100}
                width={100}
                className='w-100 h-100 object-cover p-3'
              />
            ))}
          </div>
        </div>
      )}
    />
  )
}

export default ImageUpload
