export interface Post {
  id: string;
  title: string;
  content: string;
  mediaFiles: MediaFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFile {
  id: string;
  file: File;
  previewUrl: string;
  type: 'image' | 'video' | 'audio';
}

export interface DraftPost extends Omit<Post, 'createdAt' | 'updatedAt'> {
  lastSaved: Date;
}