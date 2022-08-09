import React, { useState, useEffect, VFC } from 'react'
import { supabase } from '../util/client'

type Props = {
  url: string | null | undefined
  size: number
  onUpload: (url: string) => void
}

export const Avatar: VFC<Props> = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path: string) => {
    try {
      // Downloads a file.
      const { data, error } : any = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      // data: Blob(Binary Large OBject)
      // URL.createObjectURL を使ってクライアント(ブラウザ)のメモリに保存されたblobにアクセス可能な一意のURLを生成可能
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
  }
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="object-contain"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="border-2 border-black"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }} className="flex items-center justify-center">
        <label className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer" htmlFor="single">
          {isUploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={isUploading}
        />
      </div>
    </div>
  )
}