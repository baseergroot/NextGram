export interface LikeActionResponseI {
  success: boolean
  message?: string
  updatedPost?: { _id: string, likes: string[] }
}