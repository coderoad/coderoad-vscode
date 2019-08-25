import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
	path: path.join(__dirname, '../.env')
})

export const api = {
	url: process.env.API_URL || '',
	token: process.env.API_AUTH_TOKEN || '', // dev only
}