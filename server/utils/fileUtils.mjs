import fs from 'fs'
import path from 'path'

export const deleteUploadedFiles = (files, uploadFolderPath) => {
	if (files.length) {
		files.forEach((file) => {
			const filePath = path.join(uploadFolderPath, file.filename)
			try {
				fs.unlinkSync(filePath)
			} catch (err) {
				console.error(`Error while deleting file ${filePath}:`, err)
			}
		})
	}
}
