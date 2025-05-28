import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { config } from 'dotenv';

// .env Datei explizit laden
config();

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// Environment Variables für beide Seiten verfügbar machen
		'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI),
		'process.env.DB_NAME': JSON.stringify(process.env.DB_NAME),
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	}
});