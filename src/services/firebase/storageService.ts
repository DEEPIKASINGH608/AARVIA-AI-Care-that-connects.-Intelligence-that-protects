import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, isFirebaseConfigured } from '@/config/firebase'

export const storageService = {
  async uploadFile(file: File, folder: 'prescriptions' | 'records' | 'avatars'): Promise<string> {
    if (isFirebaseConfigured && storage) {
      try {
        const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`)
        const snapshot = await uploadBytes(fileRef, file)
        return await getDownloadURL(snapshot.ref)
      } catch (err) {
        console.warn('Storage upload error, using local object URL:', err)
      }
    }
    // Safe demo fallback
    return URL.createObjectURL(file)
  },
}
